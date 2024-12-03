import { queryClient } from '@/App';
import { StatusCacheQueryKeys } from '../queryCacheHelper';

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

export { deleteStatusFromFeed, deleteStatusCacheData };
