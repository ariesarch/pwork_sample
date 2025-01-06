import { getBookmarkList } from '@/services/statusActions.service';
import { GetBookmarkListQueryKey } from '@/types/queries/statusActions';
import { InfiniteQueryOptionHelper } from '@/util/helper/helper';
import { infinitePageParam, PagedResponse } from '@/util/helper/timeline';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export const useGetBookmarkList = ({
	options,
	...queryParam
}: GetBookmarkListQueryKey[1] & {
	options?: InfiniteQueryOptionHelper<
		InfiniteData<PagedResponse<Patchwork.Status[]>>
	>;
}) => {
	const queryKey: GetBookmarkListQueryKey = ['bookmark-list', queryParam];
	return useInfiniteQuery({
		queryKey,
		//@ts-expect-error
		queryFn: getBookmarkList,
		...options,
		...infinitePageParam,
	});
};
