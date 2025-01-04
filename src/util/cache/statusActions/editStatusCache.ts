import { queryClient } from '@/App';
import { DEFAULT_API_URL } from '@/util/constant';
import { StatusCacheQueryKeys } from '../queryCacheHelper';

type UpdateStatusCacheParams = {
	status_id: Patchwork.Status['id'];
	updatedStatus: Partial<Patchwork.Status>;
	queryKeys: StatusCacheQueryKeys[];
};

const updateEditedStatusInFeed = (
	data: IFeedQueryFnData,
	status_id: string,
	updatedStatus: Partial<Patchwork.Status>,
): IFeedQueryFnData => ({
	...data,
	pages: data.pages.map(page => ({
		...page,
		data: page.data.map(status => {
			if (status.id === status_id) {
				return { ...status, ...updatedStatus };
			}
			return status;
		}),
	})),
});

const updateEditedStatusInQueryCache = (
	queryKey: StatusCacheQueryKeys,
	status_id: string,
	updatedStatus: Partial<Patchwork.Status>,
) => {
	const previousData = queryClient.getQueryData<IFeedQueryFnData>(queryKey);
	if (!previousData) return;

	const updatedData = updateEditedStatusInFeed(
		previousData,
		status_id,
		updatedStatus,
	);

	queryClient.setQueryData(queryKey, updatedData);
};

const editedStatusCacheData = ({
	status_id,
	updatedStatus,
	queryKeys,
}: UpdateStatusCacheParams): void => {
	queryKeys.forEach(queryKey => {
		updateEditedStatusInQueryCache(queryKey, status_id, updatedStatus);
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

// Create Status Cache Update //
type CreateStatusParams = {
	newStatus: Patchwork.Status;
	queryKeys: StatusCacheQueryKeys[];
};

const addNewStatusToFeed = (
	data: IFeedQueryFnData,
	newStatus: Patchwork.Status,
): IFeedQueryFnData => ({
	...data,
	pages: data.pages.map(page => ({
		...page,
		data: [newStatus, ...page.data], // Adding the new status to the beginning of the list
	})),
});

const addNewStatusToQueryCache = (
	queryKey: StatusCacheQueryKeys,
	newStatus: Patchwork.Status,
) => {
	const previousData = queryClient.getQueryData<IFeedQueryFnData>(queryKey);
	if (!previousData) return;

	const updatedData = addNewStatusToFeed(previousData, newStatus);

	queryClient.setQueryData(queryKey, updatedData);
};

const createStatusAndCache = ({
	newStatus,
	queryKeys,
}: CreateStatusParams): void => {
	queryKeys.forEach(queryKey => {
		addNewStatusToQueryCache(queryKey, newStatus);
	});
};
// Create Status Cache Update //

export {
	createStatusAndCache,
	updateEditedStatusInFeed,
	editedStatusCacheData,
	getStatusCacheQueryKeys,
};
