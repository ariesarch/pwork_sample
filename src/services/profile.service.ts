import { QueryFunctionContext } from '@tanstack/react-query';
import {
	ProfileDetailQueryKey,
	ProfileDetailStatusQueryKey,
	UpdateProfileCredentialsQueryParam,
} from '@/types/queries/profile.type';
import { appendApiVersion, handleError } from '@/util/helper/helper';
import axios, { AxiosResponse } from 'axios';
import instance from './instance';

// temporary token
const token = 'uVsshEFJVC-1_F8xDXbWD1RViBxwBcAjKAp6xlztZzA';

export const getProfileDetail = async ({
	queryKey,
}: QueryFunctionContext<ProfileDetailQueryKey>) => {
	try {
		// const [, { id }] = queryKey;
		// const resp = await axios.get(
		// 	`https://backend.newsmast.org/api/v1/accounts/`,
		// 	{
		// 		params: { id },
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	},
		// );
		// return resp.data;
		const { id } = queryKey[1];
		const resp: AxiosResponse<Pathchwork.Account> = await instance.get(
			appendApiVersion(`accounts/${id}`, 'v1'),
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};

type ProfileDetailStatusResponse = {
	statuses_data: Pathchwork.Status[];
	meta: {
		pagination: { total_objects: number | null; has_more_objects: boolean };
	};
};

export const getProfileDetailStatus = async ({
	queryKey,
}: QueryFunctionContext<ProfileDetailStatusQueryKey>) => {
	try {
		const [, params] = queryKey;
		const { id } = params;
		const resp = await axios.get<ProfileDetailStatusResponse>(
			`https://backend.newsmast.org/api/v1/users/get_profile_detail_statuses_by_account`,
			{
				params: { id: id.toString() },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return resp.data.statuses_data;
	} catch (e) {
		return handleError(e);
	}
};

export const updateProfileCredendials = async (
	params: UpdateProfileCredentialsQueryParam,
): Promise<Pathchwork.Account> => {
	try {
		const resp = await axios.patch<Pathchwork.Account>(
			`https://backend.newsmast.org/api/v1/users/update_credentials`,
			params,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};
