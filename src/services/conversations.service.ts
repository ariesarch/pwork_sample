import { QueryFunctionContext } from '@tanstack/react-query';
import { SearchUsersQueryKey } from '@/types/queries/conversations.type';
import { handleError } from '@/util/helper/helper';
import axios from 'axios';

export const searchUsers = async ({
	queryKey,
}: QueryFunctionContext<SearchUsersQueryKey>) => {
	try {
		const [, params] = queryKey;
		const { query, resolve = false, limit = 4 } = params;
		// temporary token
		const token = '1sqQuoOCxOg4ENTn6_WrlnmHOMGXOGpsSVfMv76btOs';
		// const resp: AxiosResponse<Pathchwork.Account[]> = await instance.get(
		// 	appendApiVersion(`/accounts/search`),
		// 	{
		// 		params: {
		// 			q: query,
		// 			resolve,
		// 			limit,
		// 		},
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	},
		// );
		const resp = await axios.get(
			`https://mastodon.social/api/v1/accounts/search`,
			{
				params: {
					q: query,
					resolve,
					limit,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return resp;
	} catch (e) {
		return handleError(e);
	}
};
