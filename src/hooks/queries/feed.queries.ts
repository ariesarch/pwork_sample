import {
	getAccountDetailFeed,
	getFeedDetail,
	getFeedReplies,
} from '@/services/feed.service';
import {
	AccountDetailFeedQueryKey,
	FeedDetailQueryKey,
	FeedRepliesQueryKey,
} from '@/types/queries/feed.type';
import { infinitePageParam, PagedResponse } from '@/util/helper/timeline';
import {
	InfiniteData,
	useInfiniteQuery,
	UseInfiniteQueryOptions,
	useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useFeedDetailQuery = ({
	domain_name,
	id,
	enabled,
}: FeedDetailQueryKey[1]) => {
	const queryKey: FeedDetailQueryKey = [
		'feed-detail',
		{ domain_name, id, enabled },
	];
	return useQuery({ queryKey, queryFn: getFeedDetail, enabled });
};

export const useFeedRepliesQuery = ({
	domain_name,
	id,
}: FeedRepliesQueryKey[1]) => {
	const queryKey: FeedRepliesQueryKey = ['feed-replies', { domain_name, id }];
	return useQuery({ queryKey, queryFn: getFeedReplies });
};

export const useAccountDetailFeed = ({
	options,
	...queryParam
}: AccountDetailFeedQueryKey[1] & {
	options?: UseInfiniteQueryOptions<
		InfiniteData<PagedResponse<Pathchwork.Status[]>>,
		AxiosError
	>;
}) => {
	const queryKey: AccountDetailFeedQueryKey = [
		'account-detail-feed',
		queryParam,
	];
	return useInfiniteQuery({
		queryKey,
		queryFn: getAccountDetailFeed,
		...options,
		...infinitePageParam,
	});
};
