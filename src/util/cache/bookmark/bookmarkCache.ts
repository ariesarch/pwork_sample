import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { AccountDetailFeedQueryKey } from '@/types/queries/feed.type';
import { updateQueryCacheGeneric } from '../queryCacheHelper';
import { queryClient } from '@/App';
import { GetBookmarkListQueryKey } from '@/types/queries/statusActions';
import { useActiveDomainStore } from '@/store/feed/activeDomain';

export type BookmarkQueryKeys =
	| GetChannelFeedQueryKey
	| AccountDetailFeedQueryKey;

const toggleBookmarkState = (status: Patchwork.Status): Patchwork.Status => ({
	...status,
	bookmarked: !status.bookmarked,
});

const updateStatusBookmark = (status: Patchwork.Status): Patchwork.Status => {
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
	response: Patchwork.Status,
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
	response: Patchwork.Status,
) => {
	updateQueryCacheGeneric<IFeedQueryFnData>(queryKey, previousData =>
		updateFeedWithBookmark(previousData, response),
	);
};

const syncBookmarkAcrossCache = ({
	response,
	queryKeys,
}: CacheUpdateParams<Patchwork.Status, BookmarkQueryKeys>): void => {
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
		queryClient.getQueryData<Patchwork.TimelineReplies>(feedDetailQueryKey);
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

		const updatedData = updateFeedWithBookmark(previousData, status);
		queryClient.setQueryData(hashtagQueryKey, updatedData);
	}
};

const removeBookmarkFromBookmarkList = (id: string, domain_name: string) => {
	const queryParams = {
		domain_name,
		remote: false,
		only_media: false,
	};
	queryClient.setQueryData(['bookmark-list', queryParams], (oldData: any) => {
		if (!oldData) return oldData;
		return {
			...oldData,
			pages: oldData.pages.map((page: any) => ({
				...page,
				data: page.data.filter((status: any) => status.id !== id),
			})),
		};
	});
};

export {
	toggleBookmarkState,
	syncBookmarkAcrossCache,
	updateBookmarkForDescendentReply,
	updateHashtagBookmark,
	removeBookmarkFromBookmarkList,
};
