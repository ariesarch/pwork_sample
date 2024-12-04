import {
	AccountDetailFeedQueryKey,
	ComposeImagePayload,
	ComposeMutationPayload,
	FeedDetailQueryKey,
	FeedRepliesQueryKey,
	HashtagDetailFeedQueryKey,
	LinkPreviewQueryKey,
	RepostMutationPayload,
} from '@/types/queries/feed.type';
import { appendApiVersion, getMaxId, handleError } from '@/util/helper/helper';
import { QueryFunctionContext } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import instance from './instance';

export const getFeedDetail = async (
	qfContext: QueryFunctionContext<FeedDetailQueryKey>,
) => {
	const { id, domain_name } = qfContext.queryKey[1];
	const resp: AxiosResponse<Pathchwork.StatusDetail> = await instance.get(
		appendApiVersion(`statuses/${id}`),
		{
			params: { domain_name, isDynamicDomain: true },
		},
	);
	return resp.data;
};

export const getFeedReplies = async (
	qfContext: QueryFunctionContext<FeedRepliesQueryKey>,
) => {
	const { id, domain_name } = qfContext.queryKey[1];
	const resp: AxiosResponse<Pathchwork.TimelineReplies> = await instance.get(
		appendApiVersion(`statuses/${id}/context`),
		{
			params: { domain_name, isDynamicDomain: true },
		},
	);
	return resp.data;
};

export const getAccountDetailFeed = async (
	qfContext: QueryFunctionContext<AccountDetailFeedQueryKey>,
) => {
	try {
		const {
			domain_name,
			account_id,
			exclude_reblogs,
			exclude_replies,
			exclude_original_statuses,
		} = qfContext.queryKey[1];
		const max_id = qfContext.pageParam as string;

		const resp: AxiosResponse<Pathchwork.Status[]> = await instance.get(
			appendApiVersion(`accounts/${account_id}/statuses`),
			{
				params: {
					domain_name,
					isDynamicDomain: true,
					max_id,
					exclude_reblogs,
					exclude_replies,
					exclude_original_statuses,
				},
			},
		);
		const linkHeader = resp.headers.link as string;
		let maxId = null;
		if (linkHeader) {
			const regex = /max_id=(\d+)/;
			const match = linkHeader.match(regex);
			if (match) {
				maxId = match[1];
			}
		}

		return {
			data: resp.data,
			links: { next: { max_id: maxId } },
		};
	} catch (e) {
		return handleError(e);
	}
};

export const getHashtagDetailFeed = async (
	qfContext: QueryFunctionContext<HashtagDetailFeedQueryKey>,
) => {
	try {
		const { domain_name, hashtag } = qfContext.queryKey[1];
		const max_id = qfContext.pageParam as string;

		const resp: AxiosResponse<Pathchwork.Status[]> = await instance.get(
			appendApiVersion(`timelines/tag/${hashtag}`),
			{
				params: {
					domain_name,
					isDynamicDomain: true,
					max_id,
				},
			},
		);

		return {
			data: resp.data,
			links: { next: { max_id: getMaxId(resp) } },
		};
	} catch (e) {
		return handleError(e);
	}
};

export const fetchLinkPreview = async (
	qfContext: QueryFunctionContext<LinkPreviewQueryKey>,
) => {
	try {
		const { url } = qfContext.queryKey[1];
		const response: AxiosResponse<Pathchwork.LinkPreview> = await axios.get(
			`https://backend.newsmast.org/api/v1/community_statuses/link_preview`,
			{
				params: { url },
			},
		);
		return response.data;
	} catch (error) {
		return handleError(error);
	}
};

export const composeStatus = async (params: ComposeMutationPayload) => {
	try {
		const method = params.statusId ? 'put' : 'post';
		const url = appendApiVersion(
			params.statusId ? `statuses/${params.statusId}` : 'statuses',
			'v1',
		);
		const resp: AxiosResponse<Pathchwork.Status> = await instance[method](
			url,
			params,
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const repostStatus = async (params: RepostMutationPayload) => {
	try {
		const resp: AxiosResponse<Pathchwork.Status> = await instance.post(
			appendApiVersion(`statuses/${params.id}/reblog`, 'v1'),
			params,
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const uploadComposeImage = async (params: ComposeImagePayload) => {
	const { image, onProgressChange } = params;
	const formData = new FormData();
	formData.append('file', {
		uri: image.uri,
		name: image.uri?.split('/').pop(),
		type: image.type,
	});

	try {
		const resp: AxiosResponse<Pathchwork.Attachment> = await instance.post(
			appendApiVersion('media', 'v2'),
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: progressEvent => {
					const actualProgress = Math.round(
						(progressEvent.loaded * 100) / (progressEvent?.total ?? 0),
					);
					const upmostProgress = Math.min(actualProgress, 85);
					onProgressChange(upmostProgress);
				},
			},
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const favouriteStatus = async ({
	status,
}: {
	status: Pathchwork.Status;
}) => {
	const toggleFavourite = status.favourited ? 'unfavourite' : 'favourite';
	try {
		const resp: AxiosResponse<Pathchwork.Status> = await instance.post(
			appendApiVersion(`statuses/${status.id}/${toggleFavourite}`, 'v1'),
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};
