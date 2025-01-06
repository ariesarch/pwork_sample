import { queryClient } from '@/App';
import {
	StatusCacheQueryKeys,
	updateQueryCacheGeneric,
} from '../queryCacheHelper';
import { stat } from 'fs';

const incrementReblogsCount = (status: Patchwork.Status): Patchwork.Status => ({
	...status,
	reblogs_count: status.reblogs_count + 1,
	reblogged: true,
});

const updateFeedData = (
	data: IFeedQueryFnData,
	response: Patchwork.Status,
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
	response: Patchwork.Status,
) => {
	updateQueryCacheGeneric<IFeedQueryFnData>(queryKey, previousData =>
		updateFeedData(previousData, response),
	);
};

const applyReblogCountCacheUpdates = ({
	response,
	queryKeys,
}: CacheUpdateParams<Patchwork.Status, StatusCacheQueryKeys>): void => {
	queryKeys.forEach(queryKey => {
		updateStatusCache(queryKey, response);
	});
};

const updateReblogsCountForHashtag = (
	extraPayload: Record<string, any> | undefined,
	status: Patchwork.Status,
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
