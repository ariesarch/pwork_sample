import { accountInfoQueryFn } from '@/services/profile.service';
import { AccountInfoQueryKey } from '@/types/queries/profile.type';
import { useQuery } from '@tanstack/react-query';

export const useAccountInfo = (queryKey: AccountInfoQueryKey) => {
	return useQuery({
		queryKey,
		queryFn: accountInfoQueryFn,
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
