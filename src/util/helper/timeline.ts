import { InfiniteData } from '@tanstack/react-query';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PagedResponse<T = unknown> = {
	data: T;
	links?: {
		prev?: { min_id: string } | { offset: string };
		next?: { max_id: string } | { offset: string };
	};
};

export const infinitePageParam = {
	getPreviousPageParam: (firstPage: PagedResponse<any>) =>
		firstPage.links?.prev,
	getNextPageParam: (lastPage: PagedResponse<any>) => {
		return lastPage.links?.next;
	},
};

export const flattenPages = <T>(
	data: InfiniteData<PagedResponse<T[]>> | undefined,
): T[] | [] => {
	if (Array.isArray(data?.pages)) {
		return data?.pages.flatMap(page => page.data) || [];
	}
	return [];
};
