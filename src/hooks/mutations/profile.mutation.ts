import { relationshipQueryFn, updateProfile } from '@/services/profile.service';
import { UpdateProfilePayload } from '@/types/queries/profile.type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
