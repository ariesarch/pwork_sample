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
		Patchwork.Status,
		AxiosError,
		{
			status_id: Patchwork.Status['id'];
			crossChannelRequestIdentifier: string;
		}
	>,
) => {
	return useMutation({ mutationFn: statusDeleteFn, ...options });
};

export const useBookmarkStatusMutation = (
	options: MutationOptions<
		Patchwork.Status,
		AxiosError,
		{ status: Patchwork.Status; crossChannelRequestIdentifier?: string }
	>,
) => {
	return useMutation({ mutationFn: bookmarkStatus, ...options });
};
