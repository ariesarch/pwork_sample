/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dimensions } from 'react-native';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {
	QueryKey,
	UseInfiniteQueryOptions,
	UseQueryOptions,
} from '@tanstack/react-query';
import EncryptedStorage from 'react-native-encrypted-storage';
import { DEFAULT_API_URL, DEFAULT_INSTANCE } from '../constant';
import { useActiveFeedStore } from '@/store/feed/activeFeed';
import { uniqueId } from 'lodash';
import { useAuthStore } from '@/store/auth/authStore';

export const handleError = (error: any) => {
	return Promise.reject({
		status: error?.response.status,
		message:
			error?.response.data?.error ||
			error?.response.data?.message ||
			error?.response.message ||
			'Unknown error',
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
	hashTagList: Patchwork.HashtagHistory[],
	countType?: 'accounts' | 'uses',
) => {
	if (!Array.isArray(hashTagList)) return 0;
	return hashTagList.reduce(
		(accumulator: number, hashtag: Patchwork.HashtagHistory) =>
			accumulator + parseInt(hashtag[countType ?? 'uses']),
		0,
	);
};

export const ensureHttp = (url: string) => {
	if (!url.startsWith('https://')) {
		return 'https://' + url;
	}
	return url;
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

export const saveAuthState = async (key: string, value: string) => {
	try {
		await EncryptedStorage.setItem(key, value);
	} catch (err) {
		console.log(`Failed To Save ${key}`, err);
	}
};

type AuthState = {
	access_token: string;
	domain: string;
};

const defaultAuthState = {
	access_token: '',
	domain: process.env.API_URL ?? DEFAULT_API_URL,
};

export const getAuthState = async () => {
	try {
		const authState = await EncryptedStorage.getItem('AUTH_STATE');
		if (authState) {
			return JSON.parse(authState) as AuthState;
		}
		return defaultAuthState;
	} catch (err) {
		return defaultAuthState;
	}
};

export const clearEncStorage = async () => {
	return await EncryptedStorage.clear();
};

export const formatNumber = (num: number) => {
	if (num >= 1000 && num < 1000000) {
		return (num / 1000).toFixed(1) + 'K';
	} else if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	} else {
		return num?.toString();
	}
};

export const getSpecificServerStatus = async (q: string, authToken: string) => {
	try {
		const { userOriginInstance } = useAuthStore.getState();
		const isFormDifferentInstance = userOriginInstance !== DEFAULT_INSTANCE;
		const baseURl = isFormDifferentInstance
			? userOriginInstance
			: DEFAULT_INSTANCE;
		const payload = { q, resolve: true, type: 'statuses' };
		const resp: AxiosResponse<Patchwork.SearchResult> = await axios.get(
			`${baseURl}/api/v2/search`,
			{
				params: payload,
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			},
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};

export function isPatchworkStatus(data: any): data is Patchwork.Status {
	return (
		typeof data === 'object' &&
		typeof data.id === 'string' &&
		typeof data.uri === 'string' &&
		typeof data.url === 'string' &&
		typeof data.account === 'object'
	);
}

export const replaceIdInUrl = (
	url: string,
	searchRes: Patchwork.SearchResult,
) => {
	const match = url.match(/\b\d{9,}\b/);
	if (match && searchRes.statuses?.length > 0) {
		const oldId = match[0];
		const newUrl = url.replace(oldId, searchRes.statuses[0].id);
		return newUrl;
	}
	return url;
};

export const reverseSortStatusList = (data: Patchwork.TimelineReplies) => {
	if (data.ancestors?.length) data.ancestors.reverse();
	if (data.descendants?.length) data.descendants.reverse();
	return data;
};

export { scale, keyExtractor };
