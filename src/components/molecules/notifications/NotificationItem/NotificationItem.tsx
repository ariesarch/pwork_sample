import React from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { NotificationData } from '@/mock/notifications/notifications';
import { NotificationCommentIcon, NotificationFavoriteIcon, NotificationPeopleFollowIcon, NotificationRepostIcon } from '@/util/svg/icon.notification';

const iconMap: { [key: string]: React.ReactNode } = {
	like: <NotificationFavoriteIcon />,
	comment: <NotificationCommentIcon />,
	're-shared': <NotificationRepostIcon />,
	followed: <NotificationPeopleFollowIcon />,
};

const NotificationItem = ({ item }: { item: NotificationData }) => {
	return (
		<View className="py-3 px-6">
			<View className="flex-row items-center">
				{iconMap[item.type]}
				<View className="flex-1 flex-row justify-between pl-4">
					<View className="flex-1">
						<ThemeText className="font-bold mr-2">{item.text}</ThemeText>
						{item.hashtag && (
							<ThemeText className="opacity-80">{item.hashtag}</ThemeText>
						)}
					</View>
					<ThemeText size={'xs_12'} variant={'textGrey'}>
						{item.timestamp}
					</ThemeText>
				</View>
			</View>
		</View>
	);
};

export default NotificationItem;
