import { AxiosResponse } from 'axios';
import instance from './instance';
import { appendApiVersion, handleError } from '@/util/helper/helper';
import { BookmarkStatusQueryParams } from '@/types/queries/feed.type';

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
	statusId,
	isBookmark,
}: BookmarkStatusQueryParams) => {
	try {
		console.log(statusId, isBookmark);
		const resp: AxiosResponse<Pathchwork.Status> = await instance.get(
			appendApiVersion(
				`statuses/${statusId}/${isBookmark ? 'bookmark' : 'unbookmark'}`,
				'v1',
			),
		);
		return resp.data;
	} catch (error) {
		console.log('error', error);
		return handleError(error);
	}
};
