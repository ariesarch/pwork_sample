import React, { useCallback } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useNotifications } from '@/hooks/queries/notifications.queries';
import NotificationTabItem from '@/components/molecules/notifications/NotificationTabItem/NotificationTabItem';
import { NotificationItem } from '@/services/notification.service';
import { transformNotifications } from '@/util/helper/notifications';
import Underline from '@/components/atoms/common/Underline/Underline';
import NotificationLoading from '@/components/atoms/loading/NotificationLoading';
import { FlashList } from '@shopify/flash-list';
import NotificationListEmpty from '@/components/atoms/notifications/NotificationListEmpty/NotificationListEmpty';

const NotiAll = () => {
	const { data, isSuccess } = useNotifications();

	const renderItem = useCallback(
		({ item }: { item: NotificationItem }) => (
			<NotificationTabItem item={item} />
		),
		[],
	);
	if (!isSuccess) return <NotificationLoading />;

	return (
		<FlashList
			data={transformNotifications(data, 'all')}
			renderItem={renderItem}
			ItemSeparatorComponent={Underline}
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
