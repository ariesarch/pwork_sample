import {
	getConversationsList,
	searchUsers,
} from '@/services/conversations.service';
import {
	ConversationsQueryKey,
	SearchUsersQueryKey,
} from '@/types/queries/conversations.type';
import { QueryOptionHelper } from '@/util/helper/helper';
import { useQuery } from '@tanstack/react-query';
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

export const useGetConversationsList = () => {
	const queryKey: ConversationsQueryKey = ['conversations'];
	return useQuery({
		queryKey,
		queryFn: getConversationsList,
	});
};
