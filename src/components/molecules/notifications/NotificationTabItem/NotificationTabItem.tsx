import React from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import {
	NotificationFavoriteIcon,
	NotificationPeopleFollowIcon,
	NotificationBoostedIcon,
	NotificationMentionIcon,
} from '@/util/svg/icon.notification';
import Image from '@/components/atoms/common/Image/Image';
import { NotificationItem } from '@/services/notification.service';
import { timelineDateFormatter } from '@/util/helper/helper';
import dayjs from 'dayjs';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import { useNavigation } from '@react-navigation/native';
import { NotificationScreenNavigationProp } from '@/types/navigation';

const notificationMessages: Record<NotificationItem['type'], string> = {
	follow: 'followed you',
	favourite: 'favorited your post',
	mention: 'Private mention',
	reblog: 'boosted your post',
	poll: 'polled in your post',
};

const notificationTypeIcons: Record<NotificationItem['type'], React.ReactNode> =
	{
		follow: <NotificationPeopleFollowIcon />,
		favourite: <NotificationFavoriteIcon />,
		reblog: <NotificationBoostedIcon />,
		mention: <NotificationMentionIcon />,
		poll: <NotificationPeopleFollowIcon />,
	};

const NotificationTabItem = ({ item }: { item: NotificationItem }) => {
	const { account, type, status, latest_page_notification_at } = item;

	const navigation = useNavigation<NotificationScreenNavigationProp>();

	const handleOnPressStatus = (id: string) => {
		navigation.navigate('FeedDetail', { id });
	};

	return (
		<View className="items-start gap-2 px-4 pt-3 pb-1 flex-row">
			<View className="w-9 h-9 items-center justify-center">
				{notificationTypeIcons[type]}
			</View>
			<View className="flex-auto">
				<View>
					{/* Notification Account and Types */}
					<View className="flex-row items-center">
						<Image
							source={{ uri: account.avatar }}
							className="w-9 h-9 rounded-full mx-[2px]"
						/>
						<View className="flex-1 items-end">
							<ThemeText size={'fs_13'} variant={'textGrey'}>
								{timelineDateFormatter(
									dayjs(latest_page_notification_at).fromNow(),
								)}
							</ThemeText>
						</View>
					</View>
					<View>
						<ThemeText size={'md_16'} className="opacity-80 my-1">
							{account.display_name} {notificationMessages[type]}
						</ThemeText>
					</View>
					{/* Notification Account and Types */}

					{/* Notification Status */}
					{status && (
						<View className="border border-slate-200 dark:border-patchwork-grey-70 my-2 p-3 rounded-lg">
							<StatusHeader status={status} showAvatarIcon />
							<StatusContent
								status={status}
								isFromNotiStatusImage
								handleOnPress={() => handleOnPressStatus(status.id)}
							/>
						</View>
					)}
					{/* Notification Status */}
				</View>
			</View>
		</View>
	);
};

export default NotificationTabItem;
