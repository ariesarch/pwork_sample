import {
	blockUnBlockUserMutationFn,
	composeStatus,
	favouriteStatus,
	muteUnMuteUserMutationFn,
	reportMutationFn,
	repostStatus,
	uploadComposeImage,
} from '@/services/feed.service';
import {
	ComposeImagePayload,
	ComposeMutationPayload,
	ReportMutationPayload,
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
		{ status: Pathchwork.Status; crossChannelRequestIdentifier?: string }
	>,
) => {
	return useMutation({ mutationFn: favouriteStatus, ...options });
};

export const useMuteUnmuteUserMutation = (
	options: UseMutationOptions<
		Pathchwork.RelationShip,
		AxiosError,
		{ accountId: string; toMute: boolean }
	>,
) => {
	return useMutation({ mutationFn: muteUnMuteUserMutationFn, ...options });
};

export const useBlockUnBlockUserMutation = (
	options: UseMutationOptions<
		Pathchwork.RelationShip,
		AxiosError,
		{ accountId: string; toBlock: boolean }
	>,
) => {
	return useMutation({ mutationFn: blockUnBlockUserMutationFn, ...options });
};

export const useReportMutation = (
	options: UseMutationOptions<any, AxiosError, ReportMutationPayload>,
) => {
	return useMutation({ mutationFn: reportMutationFn, ...options });
};
