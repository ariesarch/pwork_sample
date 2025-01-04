import {
	getBlockedUserList,
	getMutedUserList,
} from '@/services/muteblock.service';
import {
	BlockedUserListQueryKey,
	MutedUserListQueryKey,
} from '@/types/queries/muteblock.type';
import { InfiniteQueryOptionHelper } from '@/util/helper/helper';
import { infinitePageParam, PagedResponse } from '@/util/helper/timeline';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { use } from 'i18next';

export const useGetMutedUserList = (
	options?: InfiniteQueryOptionHelper<
		InfiniteData<PagedResponse<Patchwork.MuteBlockUserAccount[]>>
	>,
) => {
	const queryKey: MutedUserListQueryKey = ['muted-user-list'];
	return useInfiniteQuery({
		queryKey,
		...options,
		//@ts-expect-error
		queryFn: getMutedUserList,
		...infinitePageParam,
	});
};

export const useGetBlockedUserList = (
	options?: InfiniteQueryOptionHelper<
		InfiniteData<PagedResponse<Patchwork.MuteBlockUserAccount[]>>
	>,
) => {
	const queryKey: BlockedUserListQueryKey = ['blocked-user-list'];
	return useInfiniteQuery({
		queryKey,
		...options,
		//@ts-expect-error
		queryFn: getBlockedUserList,
		...infinitePageParam,
	});
};
