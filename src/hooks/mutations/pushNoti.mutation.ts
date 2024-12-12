import {
	PushNotiTokenMutationPayload,
	pushNotiRevokeTokenMutationFn,
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

export const usePushNotiRevokeTokenMutation = (
	options: UseMutationOptions<
		{ message: string },
		AxiosError,
		{ notification_token: string }
	>,
) => {
	return useMutation({ mutationFn: pushNotiRevokeTokenMutationFn, ...options });
};
