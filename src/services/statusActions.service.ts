import { AxiosResponse } from 'axios';
import instance from './instance';
import { appendApiVersion, handleError } from '@/util/helper/helper';
import { QueryFunctionContext } from '@tanstack/react-query';
import { GetBookmarkListQueryKey } from '@/types/queries/statusActions';

export const statusDeleteFn = async ({
	status_id,
	crossChannelRequestIdentifier,
}: {
	status_id: Pathchwork.Status['id'];
	crossChannelRequestIdentifier: string;
}) => {
	try {
		const resp: AxiosResponse<Pathchwork.Status> = await instance.delete(
			appendApiVersion(`statuses/${status_id}`, 'v1'),
			{ data: { crossChannelRequestIdentifier } },
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const getEditStatusSourceFn = async ({
	status_id,
}: {
	status_id: Pathchwork.Status['id'];
}) => {
	try {
		const resp: AxiosResponse<Pathchwork.Status> = await instance.get(
			appendApiVersion(`statuses/${status_id}/source`, 'v1'),
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const bookmarkStatus = async ({
	status,
	crossChannelRequestIdentifier,
}: {
	status: Pathchwork.Status;
	crossChannelRequestIdentifier?: string;
}) => {
	try {
		const toggleBookmark = status.bookmarked ? 'unbookmark' : 'bookmark';
		const resp: AxiosResponse<Pathchwork.Status> = await instance.post(
			appendApiVersion(`statuses/${status.id}/${toggleBookmark}`, 'v1'),
			{ crossChannelRequestIdentifier },
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const getBookmarkList = async (
	qfContext: QueryFunctionContext<GetBookmarkListQueryKey>,
) => {
	try {
		const { domain_name } = qfContext.queryKey[1];
		const max_id = qfContext.pageParam as string;

		const resp: AxiosResponse<Pathchwork.Status[]> = await instance.get(
			appendApiVersion(`bookmarks`),
			{
				params: {
					domain_name,
					isDynamicDomain: true,
					max_id,
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
