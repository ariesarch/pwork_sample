import { getUserById } from '@/services/auth.service';
import { GetUserQueryKey, GetUserQueryParam } from '@/types/queries/auth.type';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = (payload: GetUserQueryParam) => {
	const queryKey: GetUserQueryKey = ['user', payload];
	return useQuery({ queryKey, queryFn: getUserById });
};
