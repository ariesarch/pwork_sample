import {
	bookmarkStatus,
	statusDeleteFn,
} from '@/services/statusActions.service';
import {
	MutationOptions,
	UseMutationOptions,
	useMutation,
} from '@tanstack/react-query';
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

export const useBookmarkStatusMutation = (
	options: MutationOptions<
		Pathchwork.Status,
		AxiosError,
		{ status: Pathchwork.Status; crossChannelRequestIdentifier?: string }
	>,
) => {
	return useMutation({ mutationFn: bookmarkStatus, ...options });
};
