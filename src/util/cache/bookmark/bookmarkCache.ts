import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { AccountDetailFeedQueryKey } from '@/types/queries/feed.type';
import { updateQueryCacheGeneric } from '../queryCacheHelper';
import { queryClient } from '@/App';

export type BookmarkQueryKeys =
	| GetChannelFeedQueryKey
	| AccountDetailFeedQueryKey;

const toggleBookmarkState = (status: Pathchwork.Status): Pathchwork.Status => ({
	...status,
	bookmarked: !status.bookmarked,
});

const updateStatusBookmark = (status: Pathchwork.Status): Pathchwork.Status => {
	if (status.reblog) {
		return {
			...status,
			reblog: toggleBookmarkState(status.reblog),
		};
	}
	return toggleBookmarkState(status);
};

const updateFeedWithBookmark = (
	data: IFeedQueryFnData,
	response: Pathchwork.Status,
) => {
	return {
		...data,
		pages: data.pages.map(page => ({
			...page,
			data: page.data.map(status => {
				if (status.id === response.id) {
					// Update bookmark for normal case
					return updateStatusBookmark(status);
				} else if (status.reblog?.id === response.id) {
					// Update bookmark for reblog status case
					return updateStatusBookmark(status);
				} else if (status.id === response.reblog?.id) {
					// Update bookmark for reblog status which also update to original bookmark in Profile
					return updateStatusBookmark(status);
				}
				return status;
			}),
		})),
	};
};

const updateBookmarkInCache = (
	queryKey: BookmarkQueryKeys,
	response: Pathchwork.Status,
) => {
	updateQueryCacheGeneric<IFeedQueryFnData>(queryKey, previousData =>
		updateFeedWithBookmark(previousData, response),
	);
};

const syncBookmarkAcrossCache = ({
	response,
	queryKeys,
}: CacheUpdateParams<Pathchwork.Status, BookmarkQueryKeys>): void => {
	queryKeys.forEach(queryKey => {
		updateBookmarkInCache(queryKey, response);
	});
};

const updateBookmarkForDescendentReply = (
	feedDetailId: string,
	domain_name: string,
	statusId: string,
) => {
	const feedDetailQueryKey = [
		'feed-replies',
		{ id: feedDetailId, domain_name: domain_name },
	];

	const previousData =
		queryClient.getQueryData<Pathchwork.TimelineReplies>(feedDetailQueryKey);
	if (!previousData) return;

	const updatedData = previousData.descendants.map(item => {
		if (item.id == statusId) {
			return {
				...item,
				bookmarked: !item.bookmarked,
			};
		}
		return item;
	});

	queryClient.setQueryData(feedDetailQueryKey, {
		...previousData,
		descendants: updatedData,
	});
};

const updateHashtagBookmark = (
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

		const updatedData = updateFeedWithBookmark(previousData, status);
		queryClient.setQueryData(hashtagQueryKey, updatedData);
	}
};

export {
	toggleBookmarkState,
	syncBookmarkAcrossCache,
	updateBookmarkForDescendentReply,
	updateHashtagBookmark,
};
