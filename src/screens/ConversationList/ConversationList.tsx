import React, { useMemo, useRef, useState } from 'react';
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
import DeleteModal from '@/components/atoms/conversations/DeleteModal/DeleteModal';
import { Swipeable } from 'react-native-gesture-handler';
import {
	markAsReadInConversationCache,
	removeDeletedMsgInConversationCache,
} from '@/util/cache/conversation/conversationCahce';
import { EmptyListComponent } from '@/components/molecules/conversations/EmptyListItem/EmptyListItem';
import { FloatingAddButton } from '@/components/molecules/conversations/FloatingAddButton/FloatingAddButton';
import { ConversationItem } from '@/components/molecules/conversations/ConversationItem/ConversationItem';

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
	const swipeableRefs = useRef<Record<string, Swipeable>>({});
	const [delConf, setDelConf] = useState<{ visible: boolean; id?: string }>({
		visible: false,
	});
	const [deleting, setDeleting] = useState(false);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		refetch,
	} = useGetConversationsList();
	const { mutate: markConversationAsRead } = useMarkAsReadMutation({
		onSuccess: data => markAsReadInConversationCache(data.id),
	});
	const { mutate: deleteMessage } = useMessageDeleteMutation({
		onMutate: () => setDeleting(true),
		onSuccess: (_, { id }) => removeDeletedMsgInConversationCache(id),
		onSettled: () => {
			setDeleting(false);
			setDelConf({ visible: false, id: '' });
		},
	});

	const conversationsList = useMemo(() => data?.pages.flat() || [], [data]);

	const handlePressNewChat = () => navigation.navigate('NewMessage');
	const handleRead = (id: string) => markConversationAsRead({ id });
	const handleEndReached = () => {
		if (!isFetchingNextPage && hasNextPage) fetchNextPage();
	};
	const handleDelete = (itemId: string) => {
		setDelConf({ visible: false });
		deleteMessage({ id: itemId });
	};
	const handleSwipeableClose = (id: string) => {
		const ref = swipeableRefs.current[id];
		if (ref) ref.close();
	};

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
						item={item}
						swipeableRefs={swipeableRefs}
						onPress={() => {
							if (item.unread) handleRead(item.id);
							navigation.navigate('ConversationDetail', {
								id: item.last_status.id,
								isNewMessage: false,
							});
						}}
						onSwipeOpen={() => setDelConf({ visible: true, id: item.id })}
						onSwipeClose={handleSwipeableClose}
						userInfoID={userInfo?.id!}
					/>
				)}
				onEndReachedThreshold={0.15}
				onEndReached={handleEndReached}
				ListFooterComponent={
					isFetchingNextPage ? (
						<ActivityIndicator
							color={customColor['patchwork-red-50']}
							size="large"
							className="my-5"
						/>
					) : null
				}
			/>
			<FloatingAddButton onPress={handlePressNewChat} />
			<DeleteModal
				visibile={delConf.visible}
				onPressCancel={() => {
					if (delConf.id) handleSwipeableClose(delConf.id);
					setDelConf({ visible: false });
				}}
				onPressDelete={() => {
					if (delConf.id) handleDelete(delConf.id);
				}}
			/>
		</SafeScreen>
	);
};

export default ConversationList;
