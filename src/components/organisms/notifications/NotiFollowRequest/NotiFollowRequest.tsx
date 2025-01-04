import React, { useCallback } from 'react';
import { Dimensions, RefreshControl } from 'react-native';
import { useFollowRequestNotifications } from '@/hooks/queries/notifications.queries';
import Underline from '@/components/atoms/common/Underline/Underline';
import NotificationLoading from '@/components/atoms/loading/NotificationLoading';
import { FlashList } from '@shopify/flash-list';
import NotificationListEmpty from '@/components/atoms/notifications/NotificationListEmpty/NotificationListEmpty';
import customColor from '@/util/constant/color';
import { flattenPages } from '@/util/helper/timeline';
import NotiFollowRequestTabItem from '@/components/molecules/notifications/NotiFollowRequestTabItem/NotiFollowRequestTabItem';

const NotiFollowRequest = () => {
	const { data, isLoading, isFetching, refetch } =
		useFollowRequestNotifications({});

	const renderItem = useCallback(
		({ item }: { item: Patchwork.Account }) => (
			<NotiFollowRequestTabItem {...{ item }} />
		),
		[],
	);
	if (isLoading) return <NotificationLoading />;

	return (
		<FlashList
			data={flattenPages(data)}
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
					onRefresh={refetch}
				/>
			}
		/>
	);
};

export default NotiFollowRequest;
