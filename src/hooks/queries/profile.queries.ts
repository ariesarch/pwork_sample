import {
	getProfileDetail,
	getProfileDetailStatus,
} from '@/services/profile.service';
import {
	ProfileDetailQueryKey,
	ProfileDetailStatusQueryKey,
} from '@/types/queries/profile.type';
import { useQuery } from '@tanstack/react-query';

export const useGetProfileDetail = (queryKey: ProfileDetailQueryKey) => {
	return useQuery({
		queryKey,
		queryFn: getProfileDetail,
	});
};

export const useGetProfileDetailStatus = ({ id }: ProfileDetailQueryKey[1]) => {
	const queryKey: ProfileDetailStatusQueryKey = [
		'get_profile_detail_statuses_by_account',
		{ id },
	];
	return useQuery({
		queryKey,
		queryFn: getProfileDetailStatus,
	});
};
