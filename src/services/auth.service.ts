/* eslint-disable no-console */
import { QueryFunctionContext } from '@tanstack/react-query';
import { GetUserQueryKey } from '@/types/queries/auth.type';
import instance from '@/services/instance';
import { handleError } from '@/util/helper/helper';

export const getUserById = async ({
	queryKey,
}: QueryFunctionContext<GetUserQueryKey>) => {
	try {
		const [, payload] = queryKey;
		const resp = await instance.get(`users/${payload.id}`);
		return resp;
	} catch (e) {
		return handleError(e);
	}
};
