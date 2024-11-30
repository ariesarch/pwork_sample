import { queryClient } from '@/App';
import { QueryKey } from '@tanstack/react-query';
import { DEFAULT_API_URL } from '../constant';

export const updateFeedPage = (
	data: IFeedQueryFnData,
	shouldUpdate: (status: Pathchwork.Status) => boolean,
	updateStatus: (status: Pathchwork.Status) => Pathchwork.Status,
) => ({
	...data,
	pages: data.pages.map(page => ({
		...page,
		data: page.data.map(status => {
			if (shouldUpdate(status)) {
				return updateStatus(status);
			}
			return status;
		}),
	})),
});

export const updateQueryCacheGeneric = <T>(
	queryKey: QueryKey,
	getUpdatedData: (previousData: T) => T,
) => {
	const previousData = queryClient.getQueryData<T>(queryKey);
	if (!previousData) return;

	const updatedData = getUpdatedData(previousData);

	queryClient.setQueryData(queryKey, updatedData);
};

export const getCacheQueryKeys = <T>(
	accountId: string,
	inReplyToId?: string | null,
): T[] => {
	const domain_name = process.env.API_URL || DEFAULT_API_URL;

	return [
		['channel-feed', { domain_name, remote: false, only_media: false }],
		[
			'account-detail-feed',
			{
				domain_name,
				account_id: accountId,
				exclude_replies: inReplyToId ? false : true,
				exclude_reblogs: inReplyToId ? true : false,
				exclude_original_statuses: inReplyToId ? true : false,
			},
		],
	] as T[];
};
