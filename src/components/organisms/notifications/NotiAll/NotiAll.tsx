import React from 'react';
import { FlatList, View } from 'react-native';
import { notifications } from '@/mock/notifications/notifications';
import NotificationItem from '@/components/molecules/notifications/NotificationItem/NotificationItem';

const NotiAll = () => {
	return (
		<View className="flex-1">
			<FlatList
				data={notifications}
				renderItem={({ item }) => <NotificationItem {...{ item }} />}
				keyExtractor={item => item.id}
			/>
		</View>
	);
};

export default NotiAll;
