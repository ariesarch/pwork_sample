import React, { useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useMentionsNotifications } from '@/hooks/queries/notifications.queries';
import { INotificationResponse } from '@/services/notification.service';
import NotificationTabItem from '@/components/molecules/notifications/NotificationTabItem/NotificationTabItem';
import Underline from '@/components/atoms/common/Underline/Underline';
import NotificationLoading from '@/components/atoms/loading/NotificationLoading';
import { FlashList } from '@shopify/flash-list';
import NotificationListEmpty from '@/components/atoms/notifications/NotificationListEmpty/NotificationListEmpty';

const NotiMentions = () => {
	const { data, isSuccess } = useMentionsNotifications();

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
		/>
	);
};

export default NotiMentions;
