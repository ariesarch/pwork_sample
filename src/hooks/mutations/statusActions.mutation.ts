import {
	bookmarkStatus,
	statusDeleteFn,
} from '@/services/statusActions.service';
import { BookmarkStatusQueryParams } from '@/types/queries/feed.type';
import {
	MutationOptions,
	UseMutationOptions,
	useMutation,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useStatusDeleteMutation = (
	options: UseMutationOptions<
		Pathchwork.Status,
		AxiosError,
		{
			status_id: Pathchwork.Status['id'];
			crossChannelRequestIdentifier: string;
		}
	>,
) => {
	return useMutation({ mutationFn: statusDeleteFn, ...options });
};

export const useBookmarkStatusMutation = (
	options: MutationOptions<
		Pathchwork.Status,
		AxiosError,
		BookmarkStatusQueryParams
	>,
) => {
	return useMutation({ mutationFn: bookmarkStatus, ...options });
};
