import {
	accountInfoQueryFn,
	checkRelationshipQueryFn,
	getFollowerAccountsQueryFn,
	getFollowingAccountsQueryFn,
	getSpecificServerProfile,
} from '@/services/profile.service';
import {
	AccountInfoQueryKey,
	CheckRelationshipQueryKey,
	FollowerAccountsQueryKey,
	FollowingAccountsQueryKey,
	SpecificServerProfileQueryKey,
} from '@/types/queries/profile.type';
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
import { useMemo } from 'react';

export const useAccountInfo = (queryKey: AccountInfoQueryKey) => {
	return useQuery({
		queryKey,
		queryFn: accountInfoQueryFn,
	});
};

export const createRelationshipQueryKey = (accountIds: string[]) =>
	['check-relationship-to-other-accounts', { accountIds }] as const;

export const useCheckRelationships = ({
	options,
	...queryParam
}: CheckRelationshipQueryKey[1] & {
	options?: QueryOptionHelper<Patchwork.RelationShip[]>;
}) => {
	const queryKey: CheckRelationshipQueryKey = [
		'check-relationship-to-other-accounts',
		queryParam,
	];
	return useQuery({
		queryKey,
		//@ts-expect-error
		queryFn: checkRelationshipQueryFn,
		...options,
	});
};

export const useSpecificServerProfile = ({
	options,
	...queryParam
}: SpecificServerProfileQueryKey[1] & {
	options?: QueryOptionHelper<Patchwork.SearchResult>;
}) => {
	const queryKey: SpecificServerProfileQueryKey = [
		'specify-server-profile',
		queryParam,
	];
	return useQuery({
		queryKey,
		//@ts-expect-error
		queryFn: getSpecificServerProfile,
		...options,
	});
};

export const useFollowingAccountsQuery = ({
	options,
	...queryParam
}: FollowingAccountsQueryKey[1] & {
	options?: InfiniteQueryOptionHelper<
		InfiniteData<PagedResponse<Patchwork.Account[]>>
	>;
}) => {
	const queryKey: FollowingAccountsQueryKey = [
		'following-accounts',
		queryParam,
	];
	return useInfiniteQuery({
		queryKey,
		...options,
		//@ts-expect-error
		queryFn: getFollowingAccountsQueryFn,
		...infinitePageParam,
	});
};

export const useFollowerAccountsQuery = ({
	options,
	...queryParam
}: FollowerAccountsQueryKey[1] & {
	options?: InfiniteQueryOptionHelper<
		InfiniteData<PagedResponse<Patchwork.Account[]>>
	>;
}) => {
	const queryKey: FollowerAccountsQueryKey = ['follower-accounts', queryParam];
	return useInfiniteQuery({
		queryKey,
		...options,
		//@ts-expect-error
		queryFn: getFollowerAccountsQueryFn,
		...infinitePageParam,
	});
};

// export const useGetProfileDetailStatus = ({ id }: ProfileDetailQueryKey[1]) => {
// 	const queryKey: ProfileDetailStatusQueryKey = [
// 		'get_profile_detail_statuses_by_account',
// 		{ id },
// 	];
// 	return useQuery({
// 		queryKey,
// 		queryFn: getProfileDetailStatus,
// 	});
// };
