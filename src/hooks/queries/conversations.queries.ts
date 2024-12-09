import {
	getConversationsList,
	searchUsers,
} from '@/services/conversations.service';
import { SearchUsersQueryKey } from '@/types/queries/conversations.type';
import {
	InfiniteQueryOptionHelper,
	QueryOptionHelper,
} from '@/util/helper/helper';
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

export const useGetConversationsList = () => {
	return useInfiniteQuery<
		Pathchwork.Conversations[],
		Error,
		InfiniteData<Pathchwork.Conversations[]>
	>({
		queryKey: ['conversations'],
		//@ts-expect-error
		queryFn: ({ pageParam }: { pageParam: string | null }) =>
			getConversationsList({ pageParam }),
		getNextPageParam: (
			lastPage: Pathchwork.Conversations[],
			allPages: Pathchwork.Conversations[][],
		) => {
			if (!lastPage || lastPage.length === 0) return undefined;
			const pageParams = allPages.flatMap(page => page.map(item => item.id));
			const lastParam = lastPage[lastPage.length - 1]?.id;
			const occurrences = pageParams.filter(
				param => param === lastParam,
			).length;
			if (occurrences > 1) {
				return undefined;
			}

			return lastParam;
		},
	});
};
