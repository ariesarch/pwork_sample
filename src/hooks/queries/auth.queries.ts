import { getUserById, verifyAuthToken } from '@/services/auth.service';
import {
	GetUserQueryKey,
	GetUserQueryParam,
	VerifyAuthTokenQueryKey,
} from '@/types/queries/auth.type';
import { GetChannelSearchQueryKey } from '@/types/queries/channel.type';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = (payload: GetUserQueryParam) => {
	const queryKey: GetUserQueryKey = ['user', payload];
	return useQuery({ queryKey, queryFn: getUserById });
};

export const useVerifyAuthToken = ({
	enabled = false,
}: {
	enabled?: boolean;
}) => {
	const queryKey: VerifyAuthTokenQueryKey = ['verify-token'];
	return useQuery({
		queryKey,
		queryFn: verifyAuthToken,
		enabled,
	});
};
