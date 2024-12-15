import React, { useMemo, useRef } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { CompositeNavigationProp } from '@react-navigation/native';

import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import {
	useMarkAsReadMutation,
	useMessageDeleteMutation,
} from '@/hooks/mutations/conversations.mutation';
import { useGetConversationsList } from '@/hooks/queries/conversations.queries';
import { useAuthStore } from '@/store/auth/authStore';
import {
	BottomStackParamList,
	ConversationsStackParamList,
} from '@/types/navigation';
import customColor from '@/util/constant/color';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import {
	markAsReadInConversationCache,
	removeDeletedMsgInConversationCache,
} from '@/util/cache/conversation/conversationCahce';
import ConversationItem from '@/components/molecules/conversations/ConversationItem/ConversationItem';
import { EmptyListComponent } from '@/components/molecules/conversations/EmptyListItem/EmptyListItem';
import { FloatingAddButton } from '@/components/molecules/conversations/FloatingAddButton/FloatingAddButton';

const { width, height } = Dimensions.get('window');

type MessageScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<BottomStackParamList, 'Conversations'>,
	StackNavigationProp<ConversationsStackParamList>
>;

const ConversationList = ({
	navigation,
}: {
	navigation: MessageScreenNavigationProp;
}) => {
	const { userInfo } = useAuthStore();
	const ref = useRef(null);
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		refetch,
	} = useGetConversationsList();
	const conversationsList = useMemo(() => data?.pages.flat() || [], [data]);

	// mutation
	const { mutate: markConversationAsRead } = useMarkAsReadMutation({
		onSuccess: data => markAsReadInConversationCache(data.id),
	});
	const { mutate: deleteMessage } = useMessageDeleteMutation({
		onSuccess: (_, { id }) => removeDeletedMsgInConversationCache(id),
	});

	// handle
	const handlePressNewChat = () => navigation.navigate('NewMessage');

	const handleEndReached = () => {
		if (!isFetchingNextPage && hasNextPage) fetchNextPage();
	};

	//render items
	const renderListFooter = () =>
		isFetchingNextPage ? (
			<ActivityIndicator
				color={customColor['patchwork-red-50']}
				size={'large'}
				className="my-5"
			/>
		) : null;

	return (
		<SafeScreen>
			<Header title="Conversations" leftCustomComponent={<BackButton />} />
			<FlashList
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						tintColor={customColor['patchwork-light-900']}
						onRefresh={refetch}
					/>
				}
				ListEmptyComponent={
					<EmptyListComponent
						isLoading={isLoading}
						onPress={handlePressNewChat}
					/>
				}
				estimatedItemSize={100}
				estimatedListSize={{ width, height }}
				contentContainerStyle={{ paddingHorizontal: 10 }}
				data={conversationsList}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => (
					<ConversationItem
						simultaneousHandlers={ref}
						item={item}
						onDismiss={id => {
							deleteMessage({ id });
						}}
						userInfoId={userInfo?.id!}
						onPress={() => {
							markConversationAsRead({ id: item.id });
							navigation.navigate('ConversationDetail', {
								id: item.last_status.id,
								isNewMessage: false,
							});
						}}
					/>
				)}
				onEndReachedThreshold={0.15}
				onEndReached={handleEndReached}
				ListFooterComponent={renderListFooter}
			/>
			<FloatingAddButton onPress={handlePressNewChat} />
		</SafeScreen>
	);
};

export default ConversationList;
