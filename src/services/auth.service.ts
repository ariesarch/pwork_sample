import { QueryFunctionContext } from '@tanstack/react-query';
import {
	GetUserQueryKey,
	LoginMutationPayload,
	VerifyAuthTokenQueryKey,
} from '@/types/queries/auth.type';
import instance from '@/services/instance';
import { appendApiVersion, handleError } from '@/util/helper/helper';
import { AxiosResponse } from 'axios';
import { GetRecommendedChannelsQueryKey } from '@/types/queries/channel.type';

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

export const login = async (params: LoginMutationPayload) => {
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

export const verifyAuthToken = async () => {
	const resp: AxiosResponse<Pathchwork.Account> = await instance.get(
		appendApiVersion('accounts/verify_credentials', 'v1'),
	);
	return resp.data;
};
