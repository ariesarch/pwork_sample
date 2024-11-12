import React from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { NotificationData } from '@/mock/notifications/notifications';
import {
	NotificationCommentIcon,
	NotificationFavoriteIcon,
	NotificationPeopleFollowIcon,
	NotificationBoostedIcon,
} from '@/util/svg/icon.notification';
import Image from '@/components/atoms/common/Image/Image';

const iconMap: { [key: string]: React.ReactNode } = {
	favourite: <NotificationFavoriteIcon />,
	// comment: <NotificationCommentIcon />,
	boost: <NotificationBoostedIcon />,
	follow: <NotificationPeopleFollowIcon />,
};

const NotificationItem = ({ item }: { item: NotificationData }) => {
	return (
		<View className="flex-1 py-3 px-6">
			<View className="flex-1 flex-row">
				<View className="mt-2">{iconMap[item.type]}</View>
				<View className="flex-1 pl-4">
					<View className="flex-1 flex-row items-center">
						{item.users.map(user => (
							<Image
								key={user.id}
								uri={user.image}
								className="w-8 h-8 rounded-full mx-[2px]"
							/>
						))}
						<View className="flex-1 items-end">
							<ThemeText size={'xs_12'} variant={'textGrey'}>
								{item.time}
							</ThemeText>
						</View>
					</View>
					<ThemeText className="opacity-80 my-1">{item.message}</ThemeText>
					{item.post && (
						<View
							className={'p-2 rounded-lg mt-2 border border-patchwork-grey-70'}
						>
							<View className="flex-row items-center mb-1">
								<Image
									uri={require('../../../../../assets/images/mock/notiChannelImg.png')}
									className="w-5 h-5 rounded-sm"
									resizeMode={'cover'}
								/>
								<ThemeText className="font-bold mx-1" size={'sm_14'}>
									{item.post.author}
								</ThemeText>
								<ThemeText size={'xs_12'} className="opacity-50">
									{item.post.domain}
								</ThemeText>
							</View>
							<ThemeText>{item.post.content}</ThemeText>
						</View>
					)}
				</View>
			</View>
		</View>
	);
};

export default NotificationItem;
