import { QueryFunctionContext } from '@tanstack/react-query';
import {
	ConversationsQueryKey,
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
	queryKey,
}: QueryFunctionContext<ConversationsQueryKey>) => {
	try {
		const [, params] = queryKey;
		const { max_id } = params;
		const resp: AxiosResponse<Pathchwork.Conversations[]> = await instance.get(
			appendApiVersion('conversations'),
			{
				params: {
					limit: 10,
					max_id: max_id,
				},
			},
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};

export const fetchConversations = async (params?: {
	max_id?: string;
	since_id?: string;
}) => {
	const response = await instance.get(appendApiVersion('conversations'), {
		params: { limit: 10 },
	});
	const linkHeader = response.headers['link'];
	const links = parseLinkHeader(linkHeader);

	return {
		data: response.data,
		nextPageUrl: links?.next,
		prevPageUrl: links?.prev,
	};
};
const parseLinkHeader = (header: string | undefined) => {
	if (!header) return null;

	const links: Record<string, string> = {};
	const parts = header.split(',');

	parts.forEach(part => {
		const section = part.split(';');
		if (section.length !== 2) return;

		const url = section[0].trim().slice(1, -1); // Remove < and >
		const rel = section[1].trim().replace(/rel="(.*)"/, '$1'); // Extract rel
		links[rel] = url;
	});

	return links;
};
