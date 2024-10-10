import { FeedDetailQueryKey } from '@/types/queries/feed.type';
import { appendApiVersion } from '@/util/helper/helper';
import { QueryFunctionContext } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import instance from './instance';

export const getFeedDetail = async (
	qfContext: QueryFunctionContext<FeedDetailQueryKey>,
) => {
	const { id, domain_name } = qfContext.queryKey[1];
	const resp: AxiosResponse<Pathchwork.StatusDetail[]> = await instance.get(
		appendApiVersion(`statuses/${id}`),
		{
			params: { domain_name, isDynamicDomain: true },
		},
	);
	return resp.data;
};
