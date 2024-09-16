/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { appendApiVersion, handleError } from '@/util/helper/helper';
import { AxiosResponse } from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { link } from 'fs';
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

// type TimelineResponse = { data: Pathchwork.Status[]; maxId: null | string };
export const getChannelFeed = async (
	qfContext: QueryFunctionContext<GetChannelFeedQueryKey>,
) => {
	try {
		const { slug, remote, only_media } = qfContext.queryKey[1];
		const param = qfContext.pageParam as { max_id: string };
		console.log('param::', param);

		const resp: AxiosResponse<Pathchwork.Status[]> = await instance.get(
			appendApiVersion('timelines/public'),
			{
				params: { slug, remote, only_media, isDynamicDomain: true, ...param },
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
		console.log('maxId::', maxId);

		return {
			data: resp.data,
			links: { next: { max_id: maxId } },
		};
	} catch (e) {
		return handleError(e);
	}
};
