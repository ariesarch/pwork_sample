import {
	FollowRequestQueryKey,
	MentionsNotificationsQueryKey,
	NotificationsQueryKey,
	getFollowRequests,
	getMentionsNotifications,
	getNotifications,
} from '@/services/notification.service';
import { InfiniteQueryOptionHelper } from '@/util/helper/helper';
import { infinitePageParam, PagedResponse } from '@/util/helper/timeline';
import {
	InfiniteData,
	useInfiniteQuery,
	useQuery,
} from '@tanstack/react-query';

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

export const useFollowRequestNotifications = ({
	options,
}: {
	options?: InfiniteQueryOptionHelper<
		InfiniteData<PagedResponse<Patchwork.Account[]>>
	>;
}) => {
	const queryKey: FollowRequestQueryKey = ['follow-request-query-key'];
	return useInfiniteQuery({
		queryKey,
		...options,
		//@ts-expect-error
		queryFn: getFollowRequests,
		...infinitePageParam,
	});
};
