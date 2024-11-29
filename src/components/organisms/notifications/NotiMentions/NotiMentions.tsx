import React, { useCallback } from 'react';
import { Dimensions, RefreshControl } from 'react-native';
import { useMentionsNotifications } from '@/hooks/queries/notifications.queries';
import { INotificationResponse } from '@/services/notification.service';
import NotificationTabItem from '@/components/molecules/notifications/NotificationTabItem/NotificationTabItem';
import Underline from '@/components/atoms/common/Underline/Underline';
import NotificationLoading from '@/components/atoms/loading/NotificationLoading';
import { FlashList } from '@shopify/flash-list';
import NotificationListEmpty from '@/components/atoms/notifications/NotificationListEmpty/NotificationListEmpty';
import customColor from '@/util/constant/color';

const NotiMentions = () => {
	const {
		data,
		isSuccess,
		isFetching,
		refetch: refetchMentionNoti,
	} = useMentionsNotifications();

	const renderItem = useCallback(
		({ item }: { item: INotificationResponse }) => (
			<NotificationTabItem item={item} />
		),
		[],
	);
	if (!isSuccess) return <NotificationLoading />;

	return (
		<FlashList
			data={data}
			renderItem={renderItem}
			ItemSeparatorComponent={Underline}
			ListEmptyComponent={<NotificationListEmpty />}
			estimatedItemSize={100}
			estimatedListSize={{
				height: Dimensions.get('screen').height,
				width: Dimensions.get('screen').width,
			}}
			refreshControl={
				<RefreshControl
					refreshing={isFetching}
					tintColor={customColor['patchwork-light-900']}
					onRefresh={refetchMentionNoti}
				/>
			}
		/>
	);
};

export default NotiMentions;
