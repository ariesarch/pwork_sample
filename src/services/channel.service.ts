import { appendApiVersion, handleError } from '@/util/helper/helper';
import { AxiosResponse } from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import {
	GetChannelAboutQueryKey,
	GetChannelAdditionalInfoQueryKey,
	GetChannelFeedQueryKey,
	GetRecommendedChannelsQueryKey,
} from '@/types/queries/channel.type';
import mockInstance from './mockInstance';
import instance from './instance';

export const getMyChannelList = async (): Promise<Pathchwork.ChannelList[]> => {
	try {
		const resp: AxiosResponse<{ data: Pathchwork.ChannelList[] }> =
			await mockInstance.get('my-channel');
		return resp.data.data;
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
