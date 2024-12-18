import { QueryFunctionContext } from '@tanstack/react-query';
import {
	ConversationByUserIdQueryKey,
	ConversationsQueryParam,
	MessageListQueryKey,
	SearchUsersQueryKey,
} from '@/types/queries/conversations.type';
import { appendApiVersion, handleError } from '@/util/helper/helper';
import { AxiosResponse } from 'axios';
import instance from './instance';

export const searchUsers = async ({
	queryKey,
}: QueryFunctionContext<SearchUsersQueryKey>) => {
	try {
		const [, params] = queryKey;
		const resp = await instance.get<Pathchwork.Conversations[]>(
			appendApiVersion('accounts/search'),
			{ params },
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

export const deleteMesssage = async ({ id }: { id: string }) => {
	try {
		const resp = await instance.delete(appendApiVersion(`conversations/${id}`));
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const getAllNotiReqWPagination = async ({
	pageParam = null,
}: {
	pageParam?: string | null;
}): Promise<Pathchwork.NotiReq[]> => {
	try {
		const limit = 10;
		const params: ConversationsQueryParam = { limit, max_id: pageParam };
		const { data } = await instance.get<Pathchwork.NotiReq[]>(
			appendApiVersion('notifications/requests'),
			{ params },
		);
		return data;
	} catch (e) {
		return handleError(e);
	}
};

export const getAllNotiReq = async (): Promise<Pathchwork.NotiReq[]> => {
	try {
		const { data } = await instance.get<Pathchwork.NotiReq[]>(
			appendApiVersion('notifications/requests'),
		);
		return data;
	} catch (e) {
		return handleError(e);
	}
};

export const acceptNotiReq = async ({ id }: { id: string }) => {
	try {
		const response = await instance.post(
			appendApiVersion(`notifications/requests/${id}/accept`),
		);
		return response.data;
	} catch (error) {
		return handleError(error);
	}
};

export const dismissNotiReq = async ({ id }: { id: string }) => {
	try {
		const response = await instance.post(
			appendApiVersion(`notifications/requests/${id}/dismiss`),
		);
		return response.data;
	} catch (error) {
		return handleError(error);
	}
};

export const getConversationByUserId = async (
	qfContext: QueryFunctionContext<ConversationByUserIdQueryKey>,
) => {
	try {
		const { id } = qfContext.queryKey[1];
		const resp: AxiosResponse<Pathchwork.Conversations> = await instance.get(
			appendApiVersion(`patchwork/conversations/check_conversation`),
			{
				params: { target_account_id: id },
			},
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};
