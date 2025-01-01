import { queryClient } from '@/App';
import {
	StatusCacheQueryKeys,
	updateQueryCacheGeneric,
} from '../queryCacheHelper';
import { stat } from 'fs';

const incrementReblogsCount = (
	status: Pathchwork.Status,
): Pathchwork.Status => ({
	...status,
	reblogs_count: status.reblogs_count + 1,
	reblogged: true,
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

const updateReblogsCountForHashtag = (
	extraPayload: Record<string, any> | undefined,
	status: Pathchwork.Status,
) => {
	if (extraPayload && extraPayload.hashtag && extraPayload.domain_name) {
		const hashtagQueryKey = [
			'hashtag-detail-feed',
			{ domain_name: extraPayload.domain_name, hashtag: extraPayload.hashtag },
		];
		const previousData =
			queryClient.getQueryData<IFeedQueryFnData>(hashtagQueryKey);
		if (!previousData) return;

		const updatedData = updateFeedData(previousData, status);
		queryClient.setQueryData(hashtagQueryKey, updatedData);
	}
};

export {
	applyReblogCountCacheUpdates,
	incrementReblogsCount,
	updateReblogsCountForHashtag,
};
