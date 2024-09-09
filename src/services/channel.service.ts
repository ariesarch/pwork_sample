/* eslint-disable @typescript-eslint/naming-convention */
import { appendApiVersion, handleError } from '@/util/helper/helper';
import { AxiosResponse } from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import mockInstance from './mockInstance';
import instance from './instance';

export const getMyChannelList = async (): Promise<Pathchwork.Channel[]> => {
	try {
		const resp: AxiosResponse<Pathchwork.Channel[]> = await mockInstance.get(
			'my-channel',
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};

export const getChannelFeed = async (
	qfContext: QueryFunctionContext<GetChannelFeedQueryKey>,
): Promise<Pathchwork.Status[]> => {
	try {
		const { slug, remote, only_media } = qfContext.queryKey[1];
		const resp: AxiosResponse<Pathchwork.Status[]> = await instance.get(
			appendApiVersion('timelines/public'),
			{
				params: { slug, remote, only_media, isDynamicDomain: true },
			},
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};
