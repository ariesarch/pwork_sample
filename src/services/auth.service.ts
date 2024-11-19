import { QueryFunctionContext } from '@tanstack/react-query';
import {
	GetUserQueryKey,
	LoginMutationPayload,
} from '@/types/queries/auth.type';
import instance from '@/services/instance';
import { handleError } from '@/util/helper/helper';
import { AxiosResponse } from 'axios';

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

export const loginMutationFunction = async (params: LoginMutationPayload) => {
	const body = {
		...params,
		grant_type: 'password',
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET_TOKEN,
	};
	console.log('CLIENT_ID::', process.env.CLIENT_ID);

	try {
		const { data }: AxiosResponse<Pathchwork.LoginRespone> =
			await instance.post('/oauth/token', body);
		return data;
	} catch (error) {
		return handleError(error);
	}
};
