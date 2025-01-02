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
		scope: 'read write follow push',
	};

	try {
		const { data }: AxiosResponse<Pathchwork.LoginRespone> =
			await instance.post('/oauth/token', body);
		return data;
	} catch (error) {
		return handleError(error);
	}
};

export const verifyAuthToken = async () => {
	try {
		const resp: AxiosResponse<Pathchwork.Account> = await instance.get(
			appendApiVersion('accounts/verify_credentials', 'v1'),
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const requestForgotPassword = async (params: { email: string }) => {
	try {
		const resp: AxiosResponse<{ reset_password_token: string }> =
			await instance.post(appendApiVersion('custom_passwords', 'v1'), params);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const forgetPWVerifyOTP = async (params: {
	id: string;
	otp_secret: string;
}) => {
	try {
		const resp: AxiosResponse<{ message: string }> = await instance.post(
			appendApiVersion('custom_passwords/verify_otp', 'v1'),
			params,
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const resetPassword = async (params: {
	reset_password_token: string;
	password: string;
	password_confirmation: string;
}) => {
	try {
		const resp: AxiosResponse<{ message: string }> = await instance.put(
			appendApiVersion(`custom_passwords/${params.reset_password_token}`, 'v1'),
			{
				password: params.password,
				password_confirmation: params.password_confirmation,
			},
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const updatePassword = async (params: {
	current_password: string;
	password: string;
	password_confirmation: string;
}) => {
	try {
		const resp: AxiosResponse<{ message: string }> = await instance.post(
			appendApiVersion(`custom_passwords/change_password`, 'v1'),
			{
				current_password: params.current_password,
				password: params.password,
				password_confirmation: params.password_confirmation,
			},
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const revokeToken = async (params: { token: string }) => {
	try {
		const body = {
			...params,
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET_TOKEN,
		};
		const resp: AxiosResponse<{}> = await instance.post('/oauth/revoke', body);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};
