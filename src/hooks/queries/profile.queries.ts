import {
	accountInfoQueryFn,
	checkRelationshipQueryFn,
	getSpecificServerProfile,
} from '@/services/profile.service';
import {
	AccountInfoQueryKey,
	CheckRelationshipQueryKey,
	SpecificServerProfileQueryKey,
} from '@/types/queries/profile.type';
import { QueryOptionHelper } from '@/util/helper/helper';
import { useQuery } from '@tanstack/react-query';

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
	options?: QueryOptionHelper<Pathchwork.RelationShip[]>;
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
	options?: QueryOptionHelper<Pathchwork.SearchResult>;
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
