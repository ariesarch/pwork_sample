import {
	GetChannelAdditionalInfoQueryKey,
	GetChannelSearchQueryKey,
	GetCollectionChannelListQueryKey,
	GetDetailChannelListQueryKey,
	GetMyChannelListQueryKey,
} from './../../types/queries/channel.type';
import {
	getChannelAbout,
	getChannelAdditionalInfo,
	getChannelFeed,
	getCollectionChannelList,
	getDetailChannelList,
	getMyChannelList,
	getRecommendedChannel,
	getSearchChannelResult,
} from '@/services/channel.service';
import {
	GetChannelAboutQueryKey,
	GetChannelFeedQueryKey,
	GetRecommendedChannelsQueryKey,
} from '@/types/queries/channel.type';
import { InfiniteQueryOptionHelper } from '@/util/helper/helper';
import { infinitePageParam, PagedResponse } from '@/util/helper/timeline';
import {
	InfiniteData,
	useInfiniteQuery,
	UseInfiniteQueryOptions,
	useQuery,
} from '@tanstack/react-query';

export const useGetMyChannels = () => {
	const queryKey: GetMyChannelListQueryKey = ['my-channel'];
	return useQuery({ queryKey, queryFn: getMyChannelList });
};

export const useRecommendedChannels = () => {
	const queryKey: GetRecommendedChannelsQueryKey = ['recommended-channel'];
	return useQuery({ queryKey, queryFn: getRecommendedChannel });
};

export const useGetChannelFeed = ({
	options,
	...queryParam
}: GetChannelFeedQueryKey[1] & {
	options?: InfiniteQueryOptionHelper<
		InfiniteData<PagedResponse<Patchwork.Status[]>>
	>;
}) => {
	const queryKey: GetChannelFeedQueryKey = ['channel-feed', queryParam];
	return useInfiniteQuery({
		queryKey,
		//@ts-expect-error
		queryFn: getChannelFeed,
		...options,
		...infinitePageParam,
	});
};

export const useGetChannelAbout = (domain_name: string) => {
	const queryKey: GetChannelAboutQueryKey = ['channel-about', { domain_name }];
	return useQuery({ queryKey, queryFn: getChannelAbout });
};

export const useGetChannelAdditionalInfo = (domain_name: string) => {
	const queryKey: GetChannelAdditionalInfoQueryKey = [
		'channel-additional-info',
		{ domain_name },
	];
	return useQuery({ queryKey, queryFn: getChannelAdditionalInfo });
};

export const useSearchChannel = ({
	searchKeyword,
	enabled = false,
}: {
	searchKeyword: string;
	enabled?: boolean;
}) => {
	const queryKey: GetChannelSearchQueryKey = [
		'channel-search',
		{ searchKeyword },
	];
	return useQuery({
		queryKey,
		queryFn: getSearchChannelResult,
		enabled,
	});
};

export const useCollectionChannelList = () => {
	const queryKey: GetCollectionChannelListQueryKey = ['collection-channels'];
	return useQuery({ queryKey, queryFn: getCollectionChannelList });
};

export const useDetailChannelList = ({ slug }: { slug: string }) => {
	const queryKey: GetDetailChannelListQueryKey = ['detail-channels', { slug }];
	return useQuery({
		queryKey,
		queryFn: getDetailChannelList,
	});
};
