import {
	accountInfoQueryFn,
	checkRelationshipQueryFn,
} from '@/services/profile.service';
import {
	AccountInfoQueryKey,
	CheckRelationshipQueryKey,
} from '@/types/queries/profile.type';
import { useQuery } from '@tanstack/react-query';

export const useAccountInfo = (queryKey: AccountInfoQueryKey) => {
	return useQuery({
		queryKey,
		queryFn: accountInfoQueryFn,
	});
};

export const createRelationshipQueryKey = (accountIds: string[]) =>
	['check-relationship-to-other-accounts', { accountIds }] as const;
export const useCheckRelationships = (queryKey: CheckRelationshipQueryKey) => {
	return useQuery({
		queryKey,
		queryFn: checkRelationshipQueryFn,
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
