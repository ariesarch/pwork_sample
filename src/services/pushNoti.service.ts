import { AxiosResponse } from 'axios';
import instance from './instance';
import { appendApiVersion, handleError } from '@/util/helper/helper';

export type PushNotiTokenMutationPayload = {
	notification_token: string | null;
	platform_type: string;
};

export const pushNotiTokenMutationFn = async (
	params: PushNotiTokenMutationPayload,
) => {
	try {
		const resp: AxiosResponse<{ message: string }> = await instance.post(
			appendApiVersion('notification_tokens', 'v1'),
			params,
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};
