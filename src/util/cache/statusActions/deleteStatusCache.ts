import { queryClient } from '@/App';
import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { AccountDetailFeedQueryKey } from '@/types/queries/feed.type';
import { DEFAULT_API_URL } from '@/util/constant';

export type StatusCacheQueryKeys =
	| GetChannelFeedQueryKey
	| AccountDetailFeedQueryKey;

type DeleteStatusCacheParams = {
	status_id: Pathchwork.Status['id'];
	queryKeys: StatusCacheQueryKeys[];
};

const deleteStatusFromFeed = (
	data: IFeedQueryFnData,
	status_id: string,
): IFeedQueryFnData => ({
	...data,
	pages: data.pages.map(page => ({
		...page,
		data: page.data.filter(status => status.id !== status_id),
	})),
});

const deleteStatusFromQueryCache = (
	queryKey: StatusCacheQueryKeys,
	status_id: string,
) => {
	const previousData = queryClient.getQueryData<IFeedQueryFnData>(queryKey);
	if (!previousData) return;

	const updatedData = deleteStatusFromFeed(previousData, status_id);

	queryClient.setQueryData(queryKey, updatedData);
};

const deleteStatusCacheData = ({
	status_id,
	queryKeys,
}: DeleteStatusCacheParams): void => {
	queryKeys.forEach(queryKey => {
		deleteStatusFromQueryCache(queryKey, status_id);
	});
};

const getStatusCacheQueryKeys = (accountId: string): StatusCacheQueryKeys[] => {
	const domain_name = process.env.API_URL || DEFAULT_API_URL;

	return [
		['channel-feed', { domain_name, remote: false, only_media: false }],
		[
			'account-detail-feed',
			{
				domain_name,
				account_id: accountId,
				exclude_replies: true,
				exclude_reblogs: false,
				exclude_original_statuses: false,
			},
		],
	];
};

export { deleteStatusFromFeed, deleteStatusCacheData, getStatusCacheQueryKeys };
