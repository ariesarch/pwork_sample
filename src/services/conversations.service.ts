import { QueryFunctionContext } from '@tanstack/react-query';
import {
	ConversationsQueryKey,
	SearchUsersQueryKey,
} from '@/types/queries/conversations.type';
import { appendApiVersion, handleError } from '@/util/helper/helper';
import axios, { AxiosResponse } from 'axios';
import instance from './instance';
import { useConvertAnimatedToValue } from 'react-native-collapsible-tab-view/lib/typescript/src/hooks';

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
	queryKey,
}: QueryFunctionContext<ConversationsQueryKey>) => {
	try {
		const resp: AxiosResponse<Pathchwork.Conversations[]> = await instance.get(
			appendApiVersion(`conversations`),
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};
