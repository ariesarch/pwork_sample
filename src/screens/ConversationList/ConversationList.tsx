import React, { useMemo, useState } from 'react';
import {
	ActivityIndicator,
	ListRenderItemInfo,
	RefreshControl,
	TouchableOpacity,
	View,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';

import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import {
	useMarkAsReadMutation,
	useMessageDeleteMutation,
} from '@/hooks/mutations/conversations.mutation';
import {
	useGetAllNotiReq,
	useGetConversationsList,
} from '@/hooks/queries/conversations.queries';
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
import { SwipeListView } from 'react-native-swipe-list-view';
import { DeleteIcon } from '@/util/svg/icon.common';
import DeleteModal from '@/components/atoms/conversations/DeleteModal/DeleteModal';
import NofiReqButton from '@/components/atoms/conversations/NotificationRequestsButton/NotificationRequestsButton';

type RowMap<T> = { [key: string]: T };

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
	const [delConf, setDelConf] = useState<{
		visible: boolean;
		id?: string;
		rowMap?: RowMap<any>;
	}>({
		visible: false,
	});

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		refetch,
	} = useGetConversationsList();
	const conversationsList = useMemo(() => data?.pages.flat() || [], [data]);

	const { data: notiReqList, refetch: refetchNotiReq } = useGetAllNotiReq();

	// mutation
	const { mutate: markConversationAsRead } = useMarkAsReadMutation({
		onSuccess: data => markAsReadInConversationCache(data.id),
	});
	const { mutate: deleteMessage } = useMessageDeleteMutation({
		onSuccess: (_, { id }) => {
			removeDeletedMsgInConversationCache(id);
		},
	});

	// handle
	const handlePressNewChat = () => navigation.navigate('NewMessage');
	const handleEndReached = () => {
		if (!isFetchingNextPage && hasNextPage) fetchNextPage();
	};

	const closeRow = (rowMap: RowMap<any>, rowKey: string) => {
		if (rowMap && rowMap[rowKey]) rowMap[rowKey].closeRow();
	};
	const deleteRow = (rowMap: RowMap<any>, rowKey: string) => {
		setDelConf({ visible: true, id: rowKey, rowMap });
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

	const renderHiddenItem = (
		rowData: ListRenderItemInfo<Pathchwork.Conversations>,
		rowMap: RowMap<any>,
	) => (
		<TouchableOpacity
			className="flex-1 p-3 rounded-r-md absolute right-2 justify-center items-center h-full w-2/12 bg-patchwork-red-50"
			onPress={() => deleteRow(rowMap, rowData.item.id)}
		>
			<DeleteIcon fill={'white'} />
		</TouchableOpacity>
	);

	return (
		<SafeScreen>
			<Header
				title="Conversations"
				leftCustomComponent={<BackButton />}
				rightCustomComponent={
					<NofiReqButton
						isThereData={notiReqList && notiReqList?.length > 0 ? true : false}
						customOnPress={() => navigation.navigate('NotificationRequests')}
					/>
				}
			/>
			<SwipeListView
				data={conversationsList}
				keyExtractor={item => item.id}
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						tintColor={customColor['patchwork-light-900']}
						onRefresh={() => {
							refetch();
							refetchNotiReq();
						}}
					/>
				}
				ListEmptyComponent={
					<EmptyListComponent
						isLoading={isLoading}
						onPress={handlePressNewChat}
					/>
				}
				renderItem={({ item }) => (
					<ConversationItem
						item={item}
						userInfoId={userInfo?.id!}
						onPress={() => {
							if (item.unread) {
								markConversationAsRead({ id: item.id });
							}
							navigation.navigate('ConversationDetail', {
								id: item.last_status.id,
								isNewMessage: false,
							});
						}}
					/>
				)}
				onEndReached={handleEndReached}
				renderHiddenItem={renderHiddenItem}
				ListFooterComponent={renderListFooter}
				rightOpenValue={-80}
				disableRightSwipe
				previewRowKey={'0'}
				previewOpenValue={-40}
				previewOpenDelay={3000}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			/>
			<FloatingAddButton onPress={handlePressNewChat} />
			<DeleteModal
				visibile={delConf?.visible}
				onPressCancel={() => {
					if (delConf.rowMap && delConf.id) {
						setDelConf({ visible: false });
						closeRow(delConf.rowMap, delConf.id);
					}
				}}
				onPressDelete={() => {
					if (delConf?.id) {
						setDelConf({ visible: false });
						deleteMessage({ id: delConf.id });
					}
				}}
			/>
		</SafeScreen>
	);
};

export default ConversationList;
