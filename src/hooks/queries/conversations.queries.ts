import {
	getAllNotiReq,
	getAllNotiReqWPagination,
	getConversationsList,
	getMessageList,
	searchUsers,
} from '@/services/conversations.service';
import {
	MessageListQueryKey,
	NotiReqQueryKey,
	SearchUsersQueryKey,
} from '@/types/queries/conversations.type';
import { QueryOptionHelper } from '@/util/helper/helper';
import {
	InfiniteData,
	useInfiniteQuery,
	useQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const useSearchUsers = ({
	options,
	...queryParam
}: SearchUsersQueryKey[1] & {
	options?: QueryOptionHelper<AxiosResponse<Pathchwork.Account[]>>;
}) => {
	const queryKey: SearchUsersQueryKey = ['users', queryParam];
	return useQuery({
		queryKey,
		//@ts-expect-error
		queryFn: searchUsers,
		...options,
	});
};

export const useGetConversationsList = (
	options?: QueryOptionHelper<Pathchwork.Conversations[]>,
) => {
	return useInfiniteQuery<
		Pathchwork.Conversations[],
		Error,
		InfiniteData<Pathchwork.Conversations[]>
	>({
		queryKey: ['conversations'],
		//@ts-expect-error
		queryFn: ({ pageParam }: { pageParam: string | null }) =>
			getConversationsList({ pageParam }),
		...options,
		getNextPageParam: (lastPage: Pathchwork.Conversations[]) => {
			if (!lastPage || lastPage.length === 0) return undefined;
			const lastParam = lastPage[lastPage.length - 1]?.last_status?.id;
			return lastParam;
		},
		select: data => {
			const deduplicatedList: Pathchwork.Conversations[] = data.pages
				.flat()
				.filter(
					(item, index, self) =>
						index === self.findIndex(t => t.id === item.id),
				);

			return {
				...data,
				pages: [deduplicatedList],
			};
		},
	});
};

export const useMessageListQuery = ({
	id,
	options,
}: MessageListQueryKey[1] & {
	options?: QueryOptionHelper<Pathchwork.TimelineReplies>;
}) => {
	const queryKey: MessageListQueryKey = ['message-list', { id }];
	//@ts-expect-error
	return useQuery({ queryKey, queryFn: getMessageList, ...options });
};

export const useGetAllNotiReqWPagination = (
	options?: QueryOptionHelper<Pathchwork.NotiReq[]>,
) => {
	return useInfiniteQuery<
		Pathchwork.NotiReq[],
		Error,
		InfiniteData<Pathchwork.NotiReq[]>
	>({
		queryKey: ['all-noti-req'],
		//@ts-expect-error
		queryFn: ({ pageParam }: { pageParam: string | null }) =>
			getAllNotiReqWPagination({ pageParam }),
		...options,
		getNextPageParam: (lastPage: Pathchwork.NotiReq[]) => {
			if (!lastPage || lastPage.length === 0) return undefined;
			const lastParam = lastPage[lastPage.length - 1]?.last_status?.id;
			return lastParam;
		},
		select: data => {
			const deduplicatedList: Pathchwork.NotiReq[] = data.pages
				.flat()
				.filter(
					(item, index, self) =>
						index === self.findIndex(t => t.id === item.id),
				);

			return {
				...data,
				pages: [deduplicatedList],
			};
		},
	});
};

export const useGetAllNotiReq = (
	options?: QueryOptionHelper<Pathchwork.NotiReq[]>,
) => {
	const queryKey: NotiReqQueryKey = ['all-noti-req'];
	return useQuery({ queryKey, queryFn: getAllNotiReq, ...options });
};
