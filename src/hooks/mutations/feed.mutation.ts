import { composeStatus, repostStatus } from '@/services/feed.service';
import {
	ComposeMutationPayload,
	RepostMutationPayload,
} from '@/types/queries/feed.type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useComposeMutation = (
	options: UseMutationOptions<
		Pathchwork.Status,
		AxiosError,
		ComposeMutationPayload
	>,
) => {
	return useMutation({ mutationFn: composeStatus, ...options });
};

export const useRepostMutation = (
	options: UseMutationOptions<
		Pathchwork.Status,
		AxiosError,
		RepostMutationPayload
	>,
) => {
	return useMutation({ mutationFn: repostStatus, ...options });
};
