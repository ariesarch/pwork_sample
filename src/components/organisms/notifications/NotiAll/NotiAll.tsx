import React, { useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useNotifications } from '@/hooks/queries/notifications.queries';
import NotificationTabItem from '@/components/molecules/notifications/NotificationTabItem/NotificationTabItem';
import { INotificationResponse } from '@/services/notification.service';
import Underline from '@/components/atoms/common/Underline/Underline';
import NotificationLoading from '@/components/atoms/loading/NotificationLoading';
import { FlashList } from '@shopify/flash-list';
import NotificationListEmpty from '@/components/atoms/notifications/NotificationListEmpty/NotificationListEmpty';
import { RefreshControl } from 'react-native';
import customColor from '@/util/constant/color';

const NotiAll = () => {
	const {
		data,
		isSuccess,
		isFetching,
		refetch: refetchNotification,
	} = useNotifications();

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
			refreshControl={
				<RefreshControl
					refreshing={isFetching}
					tintColor={customColor['patchwork-light-900']}
					onRefresh={refetchNotification}
				/>
			}
			ListEmptyComponent={<NotificationListEmpty />}
			estimatedItemSize={100}
			estimatedListSize={{
				height: Dimensions.get('screen').height,
				width: Dimensions.get('screen').width,
			}}
		/>
	);
};

export default NotiAll;
