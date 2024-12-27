import {
	deleteProfileMedia,
	followRequestsQueryFn,
	relationshipQueryFn,
	updateProfile,
} from '@/services/profile.service';
import { UpdateProfilePayload } from '@/types/queries/profile.type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useProfileMutation = (
	options: UseMutationOptions<
		Pathchwork.Account,
		AxiosError,
		UpdateProfilePayload
	>,
) => {
	return useMutation({ mutationFn: updateProfile, ...options });
};

export const useUserRelationshipMutation = (
	options: UseMutationOptions<
		Pathchwork.RelationShip,
		AxiosError,
		{ accountId: string; isFollowing: boolean }
	>,
) => {
	return useMutation({ mutationFn: relationshipQueryFn, ...options });
};

export const useFollowRequestsMutation = (
	options: UseMutationOptions<
		Pathchwork.RelationShip,
		AxiosError,
		{ accountId: string; requestType: 'authorize' | 'reject' }
	>,
) => {
	return useMutation({ mutationFn: followRequestsQueryFn, ...options });
};

export const useDeleteProfileMediaMutation = (
	options: UseMutationOptions<
		Pathchwork.Account,
		AxiosError,
		{ mediaType: 'avatar' | 'header' }
	>,
) => {
	return useMutation({
		mutationFn: deleteProfileMedia,
		...options,
	});
};
