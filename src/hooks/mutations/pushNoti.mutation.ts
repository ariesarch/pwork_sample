import {
	PushNotiTokenMutationPayload,
	pushNotiTokenMutationFn,
} from '@/services/pushNoti.service';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePushNotiTokenMutation = (
	options: UseMutationOptions<
		{ message: string },
		AxiosError,
		PushNotiTokenMutationPayload
	>,
) => {
	return useMutation({ mutationFn: pushNotiTokenMutationFn, ...options });
};
