import { HashtagDetailQueryKey } from '@/types/queries/hashtag.type';
import { QueryFunctionContext } from '@tanstack/react-query';
import instance from './instance';
import { AxiosResponse } from 'axios';
import { appendApiVersion } from '@/util/helper/helper';

export const getHashtagDetail = async (
	qfContext: QueryFunctionContext<HashtagDetailQueryKey>,
) => {
	const { hashtag, domain_name } = qfContext.queryKey[1];
	const resp: AxiosResponse<Pathchwork.HashtagDetail> = await instance.get(
		appendApiVersion(`tags/${hashtag}`),
		{
			params: { domain_name, isDynamicDomain: true },
		},
	);
	return resp.data;
};
