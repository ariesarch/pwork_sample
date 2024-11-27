import {
	MentionsNotificationsQueryKey,
	NotificationsQueryKey,
	getMentionsNotifications,
	getNotifications,
} from '@/services/notification.service';
import { useQuery } from '@tanstack/react-query';

export const useNotifications = () => {
	const queryKey: NotificationsQueryKey = ['noti-query-key'];

	return useQuery({
		queryKey,
		queryFn: getNotifications,
	});
};

export const useMentionsNotifications = () => {
	const queryKey: MentionsNotificationsQueryKey = ['mention-noti-query-key'];
	return useQuery({
		queryKey,
		queryFn: getMentionsNotifications,
	});
};
