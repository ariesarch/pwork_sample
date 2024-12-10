import { QueryFunctionContext } from '@tanstack/react-query';
import {
	ConversationsQueryParam,
	SearchUsersQueryKey,
} from '@/types/queries/conversations.type';
import { appendApiVersion, handleError } from '@/util/helper/helper';
import axios from 'axios';
import instance from './instance';

export const searchUsers = async ({
	queryKey,
}: QueryFunctionContext<SearchUsersQueryKey>) => {
	try {
		const [, params] = queryKey;
		const { query, resolve = false, limit = 4 } = params;
		// temporary token
		const token = 'uVsshEFJVC-1_F8xDXbWD1RViBxwBcAjKAp6xlztZzA';
		const resp = await axios.get(
			`https://backend.newsmast.org/api/v1/accounts/search`,
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

export const getConversationsList = async ({
	pageParam = null,
}: {
	pageParam?: string | null;
}): Promise<Pathchwork.Conversations[]> => {
	try {
		const limit = 10;
		const params: ConversationsQueryParam = { limit, min_id: pageParam };
		const { data } = await instance.get<Pathchwork.Conversations[]>(
			appendApiVersion('conversations'),
			{ params },
		);
		return data;
	} catch (e) {
		return handleError(e);
	}
};
