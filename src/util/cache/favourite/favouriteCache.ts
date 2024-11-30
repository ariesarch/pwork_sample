import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { AccountDetailFeedQueryKey } from '@/types/queries/feed.type';
import { updateFeedPage, updateQueryCacheGeneric } from '../queryCacheHelper';

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

export { updateFavouriteStatus, updateFavouriteCacheData };
