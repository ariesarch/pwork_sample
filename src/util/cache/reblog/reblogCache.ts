import {
	StatusCacheQueryKeys,
	updateQueryCacheGeneric,
} from '../queryCacheHelper';

const incrementReblogsCount = (
	status: Pathchwork.Status,
): Pathchwork.Status => ({
	...status,
	reblogs_count: status.reblogs_count + 1,
});

const updateFeedData = (
	data: IFeedQueryFnData,
	response: Pathchwork.Status,
) => ({
	...data,
	pages: data.pages.map(page => ({
		...page,
		data: page.data.map(status => {
			if (status.id === response.reblog?.id) {
				return incrementReblogsCount(status);
			}
			return status;
		}),
	})),
});

const updateStatusCache = (
	queryKey: StatusCacheQueryKeys,
	response: Pathchwork.Status,
) => {
	updateQueryCacheGeneric<IFeedQueryFnData>(queryKey, previousData =>
		updateFeedData(previousData, response),
	);
};

const applyReblogCountCacheUpdates = ({
	response,
	queryKeys,
}: CacheUpdateParams<Pathchwork.Status, StatusCacheQueryKeys>): void => {
	queryKeys.forEach(queryKey => {
		updateStatusCache(queryKey, response);
	});
};

export { applyReblogCountCacheUpdates, incrementReblogsCount };
