import { login } from '@/services/auth.service';
import { LoginMutationPayload } from '@/types/queries/auth.type';
import {
	MutationOptions,
	useMutation,
	UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useLoginEmailMutation = (
	options: UseMutationOptions<
		Pathchwork.LoginRespone,
		AxiosError,
		LoginMutationPayload
	>,
) => {
	return useMutation({ mutationFn: login, ...options });
};
