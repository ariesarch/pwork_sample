import { AxiosResponse } from 'axios';
import instance from './instance';
import { appendApiVersion, handleError } from '@/util/helper/helper';

export const statusDeleteFn = async ({
	status_id,
}: {
	status_id: Pathchwork.Status['id'];
}) => {
	try {
		const resp: AxiosResponse<Pathchwork.Status> = await instance.delete(
			appendApiVersion(`statuses/${status_id}`, 'v1'),
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};
