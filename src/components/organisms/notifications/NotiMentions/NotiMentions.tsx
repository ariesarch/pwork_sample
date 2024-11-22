import React, { useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useMentionsNotifications } from '@/hooks/queries/notifications.queries';
import { NotificationItem } from '@/services/notification.service';
import NotificationTabItem from '@/components/molecules/notifications/NotificationTabItem/NotificationTabItem';
import Underline from '@/components/atoms/common/Underline/Underline';
import { transformNotifications } from '@/util/helper/notifications';
import NotificationLoading from '@/components/atoms/loading/NotificationLoading';
import { FlashList } from '@shopify/flash-list';
import NotificationListEmpty from '@/components/atoms/notifications/NotificationListEmpty/NotificationListEmpty';

const NotiMentions = () => {
	const { data, isSuccess } = useMentionsNotifications();

	const renderItem = useCallback(
		({ item }: { item: NotificationItem }) => (
			<NotificationTabItem item={item} />
		),
		[],
	);
	if (!isSuccess) return <NotificationLoading />;

	return (
		<FlashList
			data={transformNotifications(data, 'mentions')}
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
