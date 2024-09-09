import { getChannelFeed, getMyChannelList } from '@/services/channel.service';
import {
	GetChannelFeedQueryKey,
	GetMyChannelListQueryKey,
} from '@/types/queries/channel.type';
import { PagedResponse } from '@/util/helper/timeline';
import { UseInfiniteQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetMyChannels = () => {
	const queryKey: GetMyChannelListQueryKey = ['my-channel'];
	return useQuery({ queryKey, queryFn: getMyChannelList });
};

export const useGetChannelFeed = ({
	options,
	...queryParam
}: GetChannelFeedQueryKey[1] & {
	options?: UseInfiniteQueryOptions<Pathchwork.Status[], AxiosError>;
}) => {
	const queryKey: GetChannelFeedQueryKey = ['channel-feed', queryParam];
	return useQuery({ queryKey, queryFn: getChannelFeed });
};
