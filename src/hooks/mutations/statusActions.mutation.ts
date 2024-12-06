import { statusDeleteFn } from '@/services/statusActions.service';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useStatusDeleteMutation = (
	options: UseMutationOptions<
		Pathchwork.Status,
		AxiosError,
		{
			status_id: Pathchwork.Status['id'];
			crossChannelRequestIdentifier: string;
		}
	>,
) => {
	return useMutation({ mutationFn: statusDeleteFn, ...options });
};
