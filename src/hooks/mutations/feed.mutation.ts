import {
	blockUnBlockUserMutationFn,
	composeStatus,
	favouriteStatus,
	followHashtag,
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
		Patchwork.Status,
		AxiosError,
		ComposeMutationPayload
	>,
) => {
	return useMutation({ mutationFn: composeStatus, ...options });
};

export const useRepostMutation = (
	options: UseMutationOptions<
		Patchwork.Status,
		AxiosError,
		RepostMutationPayload
	>,
) => {
	return useMutation({ mutationFn: repostStatus, ...options });
};

export const useUploadComposeImageMutation = (
	options: UseMutationOptions<
		Patchwork.Attachment,
		AxiosError,
		ComposeImagePayload
	>,
) => {
	return useMutation({ mutationFn: uploadComposeImage, ...options });
};

export const useFavouriteMutation = (
	options: UseMutationOptions<
		Patchwork.Status,
		AxiosError,
		{ status: Patchwork.Status; crossChannelRequestIdentifier?: string }
	>,
) => {
	return useMutation({ mutationFn: favouriteStatus, ...options });
};

export const useHashtagFollowMutation = (
	options: UseMutationOptions<
		Patchwork.HashtagDetail,
		AxiosError,
		{ hashtag: string; isAlreadyFollowing: boolean }
	>,
) => {
	return useMutation({ mutationFn: followHashtag, ...options });
};

export const useMuteUnmuteUserMutation = (
	options: UseMutationOptions<
		Patchwork.RelationShip,
		AxiosError,
		{ accountId: string; toMute: boolean }
	>,
) => {
	return useMutation({ mutationFn: muteUnMuteUserMutationFn, ...options });
};

export const useBlockUnBlockUserMutation = (
	options: UseMutationOptions<
		Patchwork.RelationShip,
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
