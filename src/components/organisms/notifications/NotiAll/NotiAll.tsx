import React from 'react';
import { FlatList } from 'react-native';
import { notifications } from '@/mock/notifications/notifications';
import NotificationItem from '@/components/molecules/notifications/NotificationItem/NotificationItem';

const NotiAll = () => {
	return (
		<FlatList
			data={notifications}
			renderItem={({ item }) => <NotificationItem {...{ item }} />}
			keyExtractor={item => item.id}
		/>
	);
};

export default NotiAll;
