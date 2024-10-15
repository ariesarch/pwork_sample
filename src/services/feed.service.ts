import {
	AccountDetailFeedQueryKey,
	FeedDetailQueryKey,
	FeedRepliesQueryKey,
} from '@/types/queries/feed.type';
import { appendApiVersion, handleError } from '@/util/helper/helper';
import { QueryFunctionContext } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import instance from './instance';

export const getFeedDetail = async (
	qfContext: QueryFunctionContext<FeedDetailQueryKey>,
) => {
	const { id, domain_name } = qfContext.queryKey[1];
	const resp: AxiosResponse<Pathchwork.StatusDetail> = await instance.get(
		appendApiVersion(`statuses/${id}`),
		{
			params: { domain_name, isDynamicDomain: true },
		},
	);
	return resp.data;
};

export const getFeedReplies = async (
	qfContext: QueryFunctionContext<FeedRepliesQueryKey>,
) => {
	const { id, domain_name } = qfContext.queryKey[1];
	const resp: AxiosResponse<Pathchwork.TimelineReplies> = await instance.get(
		appendApiVersion(`statuses/${id}/context`),
		{
			params: { domain_name, isDynamicDomain: true },
		},
	);
	return resp.data;
};

export const getAccountDetailFeed = async (
	qfContext: QueryFunctionContext<AccountDetailFeedQueryKey>,
) => {
	try {
		const { domain_name, account_id } = qfContext.queryKey[1];
		const param = qfContext.pageParam as { max_id: string };

		const resp: AxiosResponse<Pathchwork.Status[]> = await instance.get(
			appendApiVersion(`accounts/${account_id}/statuses`),
			{
				params: {
					domain_name,
					isDynamicDomain: true,
					...param,
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
