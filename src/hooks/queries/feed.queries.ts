import {
	getAccountDetailFeed,
	getFeedDetail,
	getFeedReplies,
	getHashtagDetailFeed,
} from '@/services/feed.service';
import {
	AccountDetailFeedQueryKey,
	FeedDetailQueryKey,
	FeedRepliesQueryKey,
	HashtagDetailFeedQueryKey,
} from '@/types/queries/feed.type';
import { infinitePageParam, PagedResponse } from '@/util/helper/timeline';
import {
	InfiniteData,
	QueryFunctionContext,
	useInfiniteQuery,
	UseInfiniteQueryOptions,
	UseInfiniteQueryResult,
	useQuery,
	UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useFeedDetailQuery = ({
	options,
	...queryParam
}: FeedDetailQueryKey[1] & {
	options?: UseQueryOptions<PagedResponse<Pathchwork.Status[]>, AxiosError>;
}) => {
	const queryKey: FeedDetailQueryKey = ['feed-detail', queryParam];
	return useQuery({
		queryKey,
		queryFn: getFeedDetail,
		...options,
	});
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
	options?: UseInfiniteQueryOptions;
}) => {
	const queryKey: AccountDetailFeedQueryKey = [
		'account-detail-feed',
		queryParam,
	];
	return useInfiniteQuery({
		queryKey,
		...options,
		queryFn: getAccountDetailFeed,
		...infinitePageParam,
	});
};

export const useHashtagDetailFeedQuery = ({
	options,
	...queryParam
}: HashtagDetailFeedQueryKey[1] & {
	options?: UseInfiniteQueryOptions<
		InfiniteData<PagedResponse<Pathchwork.Status[]>>,
		AxiosError
	>;
}) => {
	const queryKey: HashtagDetailFeedQueryKey = [
		'hashtag-detail-feed',
		queryParam,
	];
	return useInfiniteQuery({
		queryKey,
		queryFn: getHashtagDetailFeed,
		...options,
		...infinitePageParam,
	});
};
