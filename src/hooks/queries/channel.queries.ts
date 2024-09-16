/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	getChannelAbout,
	getChannelFeed,
	getMyChannelList,
} from '@/services/channel.service';
import {
	GetChannelAboutQueryKey,
	GetChannelFeedQueryKey,
	GetMyChannelListQueryKey,
} from '@/types/queries/channel.type';
import { infinitePageParam, PagedResponse } from '@/util/helper/timeline';
import {
	InfiniteData,
	useInfiniteQuery,
	UseInfiniteQueryOptions,
	useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetMyChannels = () => {
	const queryKey: GetMyChannelListQueryKey = ['my-channel'];
	return useQuery({ queryKey, queryFn: getMyChannelList });
};

export const useGetChannelFeed = ({
	options,
	...queryParam
}: GetChannelFeedQueryKey[1] & {
	options?: UseInfiniteQueryOptions<
		InfiniteData<PagedResponse<Pathchwork.Status[]>>,
		AxiosError
	>;
}) => {
	const queryKey: GetChannelFeedQueryKey = ['channel-feed', queryParam];
	return useInfiniteQuery({
		queryKey,
		queryFn: getChannelFeed,
		...options,
		...infinitePageParam,
	});
};

export const useGetChannelAbout = (slug: string) => {
	const queryKey: GetChannelAboutQueryKey = ['channel-about', { slug }];
	return useQuery({ queryKey, queryFn: getChannelAbout });
};
