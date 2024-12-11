import { markAsRead } from '@/services/conversations.service';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useMarkAsReadMutation = (
	options?: UseMutationOptions<
		Pathchwork.Conversations,
		AxiosError,
		{ id: string }
	>,
) => {
	return useMutation({ mutationFn: markAsRead, ...options });
};
