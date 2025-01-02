import { appendApiVersion, handleError } from '@/util/helper/helper';
import { AxiosResponse } from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import {
	GetChannelAboutQueryKey,
	GetChannelAdditionalInfoQueryKey,
	GetChannelFeedQueryKey,
	GetChannelSearchQueryKey,
	GetCollectionChannelListQueryKey,
	GetDetailChannelListQueryKey,
	GetRecommendedChannelsQueryKey,
} from '@/types/queries/channel.type';
import instance from './instance';

export const getMyChannelList = async () => {
	try {
		const resp: AxiosResponse<Pathchwork.MyChannel> = await instance.get(
			appendApiVersion('channels/my_channel'),
			{
				params: {
					domain_name: 'https://dashboard.channel.org',
					isDynamicDomain: true,
				},
			},
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};

export const getChannelFeed = async (
	qfContext: QueryFunctionContext<GetChannelFeedQueryKey>,
) => {
	try {
		const { domain_name, remote, only_media } = qfContext.queryKey[1];
		const max_id = qfContext.pageParam as string;

		const resp: AxiosResponse<Pathchwork.Status[]> = await instance.get(
			appendApiVersion('timelines/public'),
			{
				params: {
					domain_name,
					remote,
					only_media,
					isDynamicDomain: true,
					max_id,
				},
			},
		);
		const linkHeader = resp.headers.link as string;
		let maxId = null;
		if (linkHeader) {
			const regex = /max_id=(\d+)/;
			const match = linkHeader.match(regex);
			if (match) {
				maxId = match[1];
			}
		}

		return {
			data: resp.data,
			links: { next: { max_id: maxId } },
		};
	} catch (e) {
		return handleError(e);
	}
};

export const getChannelAbout = async (
	qfContext: QueryFunctionContext<GetChannelAboutQueryKey>,
) => {
	const { domain_name } = qfContext.queryKey[1];
	const resp: AxiosResponse<Pathchwork.ChannelAbout> = await instance.get(
		appendApiVersion('instance', 'v2'),
		{
			params: { domain_name, isDynamicDomain: true },
		},
	);
	return resp.data;
};

export const getChannelAdditionalInfo = async (
	qfContext: QueryFunctionContext<GetChannelAdditionalInfoQueryKey>,
) => {
	const { domain_name } = qfContext.queryKey[1];
	const resp: AxiosResponse<Pathchwork.ChannelAdditionalInfo> =
		await instance.get(
			appendApiVersion('instance/extended_description', 'v1'),
			{
				params: { domain_name, isDynamicDomain: true },
			},
		);
	return resp.data;
};

export const getRecommendedChannel = async (
	qfContext: QueryFunctionContext<GetRecommendedChannelsQueryKey>,
) => {
	const resp: AxiosResponse<{ data: Pathchwork.ChannelList[] }> =
		await instance.get(appendApiVersion('channels/recommend_channels', 'v1'), {
			params: {
				domain_name: 'https://dashboard.channel.org',
				isDynamicDomain: true,
			},
		});
	return resp.data.data;
};

export const getSearchChannelResult = async (
	qfContext: QueryFunctionContext<GetChannelSearchQueryKey>,
) => {
	const { searchKeyword } = qfContext.queryKey[1];
	const resp: AxiosResponse<{ data: Pathchwork.ChannelList[] }> =
		await instance.get(appendApiVersion('channels/search', 'v1'), {
			params: {
				domain_name: 'https://dashboard.channel.org',
				isDynamicDomain: true,
				q: searchKeyword,
			},
		});
	return resp.data.data;
};

export const getCollectionChannelList = async (
	qfContext: QueryFunctionContext<GetCollectionChannelListQueryKey>,
) => {
	const resp: AxiosResponse<{ data: Pathchwork.CollectionList[] }> =
		await instance.get(appendApiVersion('collections', 'v1'), {
			params: {
				domain_name: 'https://dashboard.channel.org',
				isDynamicDomain: true,
			},
		});
	return resp.data.data;
};

export const getDetailChannelList = async (
	qfContext: QueryFunctionContext<GetDetailChannelListQueryKey>,
) => {
	const slug = qfContext.queryKey[1].slug;
	const resp: AxiosResponse<{ data: Pathchwork.ChannelList[] }> =
		await instance.get(appendApiVersion('collections/fetch_channels', 'v1'), {
			params: {
				domain_name: 'https://dashboard.channel.org',
				isDynamicDomain: true,
				slug,
			},
		});
	return resp.data.data;
};
