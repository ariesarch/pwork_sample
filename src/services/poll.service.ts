import { appendApiVersion, handleError } from '@/util/helper/helper';
import { AxiosResponse } from 'axios';
import instance from './instance';

export const vote = async ({
	id,
	choices,
}: {
	id: string;
	choices: number[];
}) => {
	try {
		const resp: AxiosResponse<Patchwork.Status['poll']> = await instance.post(
			appendApiVersion(`polls/${id}/votes`, 'v1'),
			{ choices },
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};
