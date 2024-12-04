import {
	fetchConversations,
	getConversationsList,
	searchUsers,
} from '@/services/conversations.service';
import {
	ConversationsQueryKey,
	SearchUsersQueryKey,
} from '@/types/queries/conversations.type';
import {
	InfiniteQueryOptionHelper,
	QueryOptionHelper,
} from '@/util/helper/helper';
import { infinitePageParam, PagedResponse } from '@/util/helper/timeline';
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

export const useConversationsList = ({
	options,
	...queryParam
}: ConversationsQueryKey[1] & {
	options?: QueryOptionHelper<AxiosResponse<Pathchwork.Conversations[]>>;
}) => {
	const queryKey: ConversationsQueryKey = ['conversations', queryParam];
	return useQuery({
		queryKey,
		//@ts-expect-error
		queryFn: getConversationsList,
	});
};
export const useConversations = () => {
	return useInfiniteQuery({
		queryKey: ['conversations'],
		queryFn: ({ pageParam }) => fetchConversations(pageParam),
		getNextPageParam: lastPage => {
			if (lastPage?.data?.length > 0) {
				return { max_id: lastPage.data[lastPage.data.length - 1].id };
			}
			return undefined;
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};
