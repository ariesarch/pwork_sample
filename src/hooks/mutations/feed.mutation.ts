import {
	composeStatus,
	favouriteStatus,
	repostStatus,
	uploadComposeImage,
} from '@/services/feed.service';
import {
	ComposeImagePayload,
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

export const useUploadComposeImageMutation = (
	options: UseMutationOptions<
		Pathchwork.Attachment,
		AxiosError,
		ComposeImagePayload
	>,
) => {
	return useMutation({ mutationFn: uploadComposeImage, ...options });
};

export const useFavouriteMutation = (
	options: UseMutationOptions<
		Pathchwork.Status,
		AxiosError,
		{ status: Pathchwork.Status }
	>,
) => {
	return useMutation({ mutationFn: favouriteStatus, ...options });
};
