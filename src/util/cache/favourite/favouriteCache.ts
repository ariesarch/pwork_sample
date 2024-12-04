import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { AccountDetailFeedQueryKey } from '@/types/queries/feed.type';
import { updateFeedPage, updateQueryCacheGeneric } from '../queryCacheHelper';
import { queryClient } from '@/App';

export type FavouriteQueryKeys =
	| GetChannelFeedQueryKey
	| AccountDetailFeedQueryKey;

const updateFavouriteStatus = (
	status: Pathchwork.Status,
): Pathchwork.Status => ({
	...status,
	favourited: !status.favourited,
	favourites_count: status.favourited
		? status.favourites_count - 1
		: status.favourites_count + 1,
});

const updateFeedPageWithFavouriteStatus = (
	data: IFeedQueryFnData,
	response: Pathchwork.Status,
) =>
	updateFeedPage(
		data,
		status => status.id === response.id,
		status => updateFavouriteStatus(status),
	);

const applyUpdateToQueryCache = (
	queryKey: FavouriteQueryKeys,
	response: Pathchwork.Status,
) => {
	updateQueryCacheGeneric<IFeedQueryFnData>(queryKey, previousData =>
		updateFeedPageWithFavouriteStatus(previousData, response),
	);
};

const updateFavouriteCacheData = ({
	response,
	queryKeys,
}: CacheUpdateParams<Pathchwork.Status, FavouriteQueryKeys>): void => {
	queryKeys.forEach(queryKey => {
		applyUpdateToQueryCache(queryKey, response);
	});
};

const updateFavouriteForDescendentReply = (
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
				favourites_count: item.favourited
					? item.favourites_count - 1
					: item.favourites_count + 1,
				favourited: !item.favourited,
			};
		}
		return item;
	});

	queryClient.setQueryData(feedDetailQueryKey, {
		...previousData,
		descendants: updatedData,
	});
};

export {
	updateFavouriteStatus,
	updateFavouriteCacheData,
	updateFavouriteForDescendentReply,
};
