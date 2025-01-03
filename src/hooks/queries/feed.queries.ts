import {
	blockUnBlockUserMutationFn,
	fetchLinkPreview,
	getAccountDetailFeed,
	getFeedDetail,
	getFeedReplies,
	getHashtagDetailFeed,
	muteUnMuteUserMutationFn,
} from '@/services/feed.service';
import {
	AccountDetailFeedQueryKey,
	FeedDetailQueryKey,
	FeedRepliesQueryKey,
	HashtagDetailFeedQueryKey,
	LinkPreviewQueryKey,
} from '@/types/queries/feed.type';
import {
	InfiniteQueryOptionHelper,
	QueryOptionHelper,
} from '@/util/helper/helper';
import { infinitePageParam, PagedResponse } from '@/util/helper/timeline';
import {
	InfiniteData,
	QueryFunctionContext,
	useInfiniteQuery,
	UseInfiniteQueryOptions,
	UseInfiniteQueryResult,
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { boolean } from 'yup';

export const useFeedDetailQuery = ({
	options,
	...queryParam
}: FeedDetailQueryKey[1] & {
	options?: QueryOptionHelper<Pathchwork.StatusDetail>;
}) => {
	const queryKey: FeedDetailQueryKey = ['feed-detail', queryParam];
	return useQuery({
		queryKey,
		//@ts-expect-error
		queryFn: getFeedDetail,
		...options,
	});
};

export const useFeedRepliesQuery = ({
	domain_name,
	id,
	options,
}: FeedRepliesQueryKey[1] & {
	options?: QueryOptionHelper<Pathchwork.TimelineReplies>;
}) => {
	const queryKey: FeedRepliesQueryKey = ['feed-replies', { domain_name, id }];
	//@ts-expect-error
	return useQuery({ queryKey, queryFn: getFeedReplies, ...options });
};

export const useAccountDetailFeed = ({
	options,
	...queryParam
}: AccountDetailFeedQueryKey[1] & {
	options?: InfiniteQueryOptionHelper<
		InfiniteData<PagedResponse<Pathchwork.Status[]>>
	>;
}) => {
	const queryKey: AccountDetailFeedQueryKey = [
		'account-detail-feed',
		queryParam,
	];
	return useInfiniteQuery({
		queryKey,
		...options,
		//@ts-expect-error
		queryFn: getAccountDetailFeed,
		...infinitePageParam,
	});
};

export const useHashtagDetailFeedQuery = ({
	options,
	...queryParam
}: HashtagDetailFeedQueryKey[1] & {
	options?: InfiniteQueryOptionHelper<
		InfiniteData<PagedResponse<Pathchwork.Status[]>>
	>;
}) => {
	const queryKey: HashtagDetailFeedQueryKey = [
		'hashtag-detail-feed',
		queryParam,
	];
	return useInfiniteQuery({
		queryKey,
		//@ts-expect-error
		queryFn: getHashtagDetailFeed,
		...options,
		...infinitePageParam,
	});
};

export const useLinkPreviewQueries = ({
	url,
	enabled = false,
}: {
	url: string;
	enabled?: boolean;
}) => {
	const queryKey: LinkPreviewQueryKey = ['link-preview', { url }];
	return useQuery({ queryKey, queryFn: fetchLinkPreview, enabled, retry: 0 });
};

export const useMuteUnmuteUserMutation = (
	options: UseMutationOptions<
		Pathchwork.RelationShip,
		AxiosError,
		{ accountId: string; toMute: boolean }
	>,
) => {
	return useMutation({ mutationFn: muteUnMuteUserMutationFn, ...options });
};

export const useBlockUnBlockUserMutation = (
	options: UseMutationOptions<
		Pathchwork.RelationShip,
		AxiosError,
		{ accountId: string; toBlock: boolean }
	>,
) => {
	return useMutation({ mutationFn: blockUnBlockUserMutationFn, ...options });
};
