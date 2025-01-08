import {
	blockUnBlockUserMutationFn,
	fetchLinkPreview,
	getAccountDetailFeed,
	getFeedDetail,
	getFeedReplies,
	getHashtagDetailFeed,
	muteUnMuteUserMutationFn,
	translationLanguagesFn,
} from '@/services/feed.service';
import {
	AccountDetailFeedQueryKey,
	FeedDetailQueryKey,
	FeedRepliesQueryKey,
	HashtagDetailFeedQueryKey,
	LinkPreviewQueryKey,
	TranslationLanguagesQueryKey,
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
	options?: QueryOptionHelper<Patchwork.StatusDetail>;
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
	options?: QueryOptionHelper<Patchwork.TimelineReplies>;
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
		InfiniteData<PagedResponse<Patchwork.Status[]>>
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
		InfiniteData<PagedResponse<Patchwork.Status[]>>
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
		Patchwork.RelationShip,
		AxiosError,
		{ accountId: string; toMute: boolean }
	>,
) => {
	return useMutation({ mutationFn: muteUnMuteUserMutationFn, ...options });
};

export const useBlockUnBlockUserMutation = (
	options: UseMutationOptions<
		Patchwork.RelationShip,
		AxiosError,
		{ accountId: string; toBlock: boolean }
	>,
) => {
	return useMutation({ mutationFn: blockUnBlockUserMutationFn, ...options });
};

export const useTranslationLanguagesQueries = () => {
	const queryKey: TranslationLanguagesQueryKey = ['translation-languages'];
	return useQuery({ queryKey, queryFn: translationLanguagesFn });
};
