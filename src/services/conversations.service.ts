import { QueryFunctionContext } from '@tanstack/react-query';
import {
	ConversationsQueryParam,
	MessageListQueryKey,
	SearchUsersQueryKey,
} from '@/types/queries/conversations.type';
import { appendApiVersion, handleError } from '@/util/helper/helper';
import axios, { AxiosResponse } from 'axios';
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
		const params: ConversationsQueryParam = { limit, max_id: pageParam };
		const { data } = await instance.get<Pathchwork.Conversations[]>(
			appendApiVersion('conversations'),
			{ params },
		);
		return data;
	} catch (e) {
		return handleError(e);
	}
};

export const markAsRead = async ({ id }: { id: string }) => {
	try {
		const response = await instance.post(
			appendApiVersion(`conversations/${id}/read`),
		);
		return response.data;
	} catch (error) {
		return handleError(error);
	}
};

export const getMessageList = async (
	qfContext: QueryFunctionContext<MessageListQueryKey>,
) => {
	const { id } = qfContext.queryKey[1];
	const resp: AxiosResponse<Pathchwork.TimelineReplies> = await instance.get(
		appendApiVersion(`statuses/${id}/context`),
		{
			params: { reverse_sort: true },
		},
	);
	return resp.data;
};
