/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dimensions } from 'react-native';
import { PagedResponse } from './timeline';
import { Axios, AxiosError, AxiosResponse } from 'axios';
import {
	QueryKey,
	UseInfiniteQueryOptions,
	UseQueryOptions,
} from '@tanstack/react-query';

export const handleError = (error: any) => {
	return Promise.reject({
		status: error?.response.status,
		message:
			error?.response.data?.error || error?.response.message || 'Unknown error',
	});
};

const scale = (size: number) => {
	return Dimensions.get('window').width / size;
};

const keyExtractor = (_: any, index: number) => index.toString();

export const appendApiVersion = (url: string, version: string = 'v1') => {
	return `/api/${version}/${url}`;
};

export const timelineDateFormatter = (value: string) => {
	if (value.includes('seconds')) {
		return 'sec ago';
	}
	if (value.includes('a minute ago')) {
		return 'min ago';
	}
	if (value.includes('minutes')) {
		return value.replace('minutes', 'm');
	}
	if (value.includes('an hour')) {
		return value.replace('an hour', '1h');
	}
	if (value.includes('hours ago')) {
		return value.replace(' hours', 'h');
	}
	if (value.includes('a day ago')) {
		return value.replace('a day', '1d');
	}
	if (value.includes('days ago')) {
		return value.replace(' days', 'd');
	}
	if (value.includes('a month ago')) {
		return value.replace('a month', '1mo');
	}
	if (value.includes('months ago')) {
		return value.replace(' months', 'mo');
	}
	if (value.includes('a year ago')) {
		return value.replace('a year', '1y');
	}
	if (value.includes('years ago')) {
		return value.replace(' years', 'y');
	}
	return value;
};

export const getMaxId = (resp: AxiosResponse) => {
	const linkHeader = resp.headers.link as string;
	let maxId = null;
	if (linkHeader) {
		const regex = /max_id=(\d+)/;
		const match = linkHeader.match(regex);
		if (match) {
			maxId = match[1];
		}
	}
	return maxId;
};

export const calculateHashTagCount = (
	hashTagList: Pathchwork.HashtagHistory[],
	countType?: 'accounts' | 'uses',
) => {
	if (!Array.isArray(hashTagList)) return 0;
	return hashTagList.reduce(
		(accumulator: number, hashtag: Pathchwork.HashtagHistory) =>
			accumulator + parseInt(hashtag[countType ?? 'uses']),
		0,
	);
};

export type QueryOptionHelper<
	TQueryFnData = unknown,
	TError = AxiosError,
	TData = TQueryFnData,
> = Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey' | 'queryFn'>;

export type InfiniteQueryOptionHelper<
	TQueryFnData = unknown,
	TData = TQueryFnData,
	PageParam = number,
	TQueryData = TQueryFnData,
	TError = AxiosError,
> = Omit<
	UseInfiniteQueryOptions<
		TQueryFnData,
		TError,
		TData,
		TQueryData,
		QueryKey,
		PageParam
	>,
	'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
>;

export { scale, keyExtractor };
