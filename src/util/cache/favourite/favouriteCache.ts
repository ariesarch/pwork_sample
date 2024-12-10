import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { AccountDetailFeedQueryKey } from '@/types/queries/feed.type';
import { updateQueryCacheGeneric } from '../queryCacheHelper';
import { queryClient } from '@/App';

export type FavouriteQueryKeys =
	| GetChannelFeedQueryKey
	| AccountDetailFeedQueryKey;

const toggleFavouriteState = (
	status: Pathchwork.Status,
): Pathchwork.Status => ({
	...status,
	favourited: !status.favourited,
	favourites_count: status.favourited
		? status.favourites_count - 1
		: status.favourites_count + 1,
});

const updateStatusFavourite = (
	status: Pathchwork.Status,
): Pathchwork.Status => {
	if (status.reblog) {
		return {
			...status,
			reblog: toggleFavouriteState(status.reblog),
		};
	}
	return toggleFavouriteState(status);
};

const updateFeedWithFavourite = (
	data: IFeedQueryFnData,
	response: Pathchwork.Status,
) => {
	return {
		...data,
		pages: data.pages.map(page => ({
			...page,
			data: page.data.map(status => {
				if (status.id === response.id) {
					// Update favourite count for normal case
					return updateStatusFavourite(status);
				} else if (status.reblog?.id === response.id) {
					// Update favourite count for reblog status case
					return updateStatusFavourite(status);
				} else if (status.id === response.reblog?.id) {
					// Update favourite count for reblog status which also update to original favourite count in Profile
					return updateStatusFavourite(status);
				}
				return status;
			}),
		})),
	};
};

const updateFavouriteInCache = (
	queryKey: FavouriteQueryKeys,
	response: Pathchwork.Status,
) => {
	updateQueryCacheGeneric<IFeedQueryFnData>(queryKey, previousData =>
		updateFeedWithFavourite(previousData, response),
	);
};

const syncFavouriteAcrossCache = ({
	response,
	queryKeys,
}: CacheUpdateParams<Pathchwork.Status, FavouriteQueryKeys>): void => {
	queryKeys.forEach(queryKey => {
		updateFavouriteInCache(queryKey, response);
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
	toggleFavouriteState,
	syncFavouriteAcrossCache,
	updateFavouriteForDescendentReply,
};
