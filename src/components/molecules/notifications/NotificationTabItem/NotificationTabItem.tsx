import React from 'react';
import { Pressable, View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import {
	NotificationFavoriteIcon,
	NotificationPeopleFollowIcon,
	NotificationBoostedIcon,
	NotificationMentionIcon,
	NotificationUpdateIcon,
	NotificationPostedIcon,
	NotificationPollIcon,
	NotificationAdminReportIcon,
} from '@/util/svg/icon.notification';
import Image from '@/components/atoms/common/Image/Image';
import {
	INotificationResponse,
	NotificationItem,
} from '@/services/notification.service';
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
	poll: 'polled has ended',
	status: 'posted',
	update: 'updated their post',
	'admin.report': 'reported a post',
};

const notificationTypeIcons: Record<NotificationItem['type'], React.ReactNode> =
	{
		follow: <NotificationPeopleFollowIcon />,
		favourite: <NotificationFavoriteIcon />,
		reblog: <NotificationBoostedIcon />,
		mention: <NotificationMentionIcon />,
		poll: <NotificationPollIcon />,
		status: <NotificationPostedIcon />,
		update: <NotificationUpdateIcon />,
		'admin.report': <NotificationAdminReportIcon />,
	};

const NotificationTabItem = ({ item }: { item: INotificationResponse }) => {
	const { account, report, status, type, created_at } = item;

	const navigation = useNavigation<NotificationScreenNavigationProp>();

	return (
		<View className="items-start gap-2 px-4 pt-3 pb-1 flex-row">
			<View className="w-9 h-9 items-center justify-center">
				{notificationTypeIcons[type]}
			</View>
			<View className="flex-auto">
				<View>
					{/* Notification Account and Types */}
					<Pressable
						className="flex-row items-center"
						onPress={() => {
							navigation.navigate('ProfileOther', {
								id: account.id,
								isFromNoti: true,
							});
						}}
					>
						<Image
							source={{ uri: account.avatar }}
							className="w-9 h-9 rounded-full mx-[2px]"
						/>
						<View className="flex-1 items-end">
							<ThemeText size={'fs_13'} variant={'textGrey'}>
								{timelineDateFormatter(dayjs(created_at).fromNow())}
							</ThemeText>
						</View>
					</Pressable>
					<View>
						<ThemeText size={'md_16'} className="opacity-80 my-1">
							{type === 'admin.report'
								? `@${account.username}`
								: account.display_name}{' '}
							{notificationMessages[type]}
						</ThemeText>
					</View>
					{/* Notification Account and Types */}

					{report && (
						<View className="border border-slate-200 dark:border-patchwork-grey-70 my-2 p-3 rounded-lg">
							<View className="flex-row justify-between">
								<ThemeText className="flex-1">id</ThemeText>
								<ThemeText className="flex-1">{report.id}</ThemeText>
							</View>
							<View className="flex-row justify-between">
								<ThemeText className="flex-1">account</ThemeText>
								<ThemeText className="flex-1">
									@{report.target_account.username}
								</ThemeText>
							</View>
							<View className="flex-row justify-between">
								<ThemeText className="flex-1">comment</ThemeText>
								<ThemeText className="flex-1">{report.comment}</ThemeText>
							</View>
						</View>
					)}

					{/* Notification Status */}
					{status && (
						<View className="border border-slate-200 dark:border-patchwork-grey-70 my-2 p-3 rounded-lg">
							<StatusHeader status={status} isFromNoti showAvatarIcon />
							<StatusContent
								status={status}
								isMainChannel
								isFromNotiStatusImage
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
