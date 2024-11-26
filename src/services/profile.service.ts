import { QueryFunctionContext } from '@tanstack/react-query';
import {
	ProfileDetailQueryKey,
	ProfileDetailStatusQueryKey,
	UpdateProfileCredentialsQueryParam,
	UpdateProfilePayload,
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

export const updateProfile = async (
	params: UpdateProfilePayload,
): Promise<Pathchwork.Account> => {
	try {
		const formData = new FormData();
		if (params.avatar && typeof params.avatar !== 'string') {
			const avatar = {
				uri: params.avatar?.uri,
				type: params.avatar?.type,
				name: params.avatar?.uri?.split('/').pop(),
			};
			formData.append('avatar', avatar);
		}
		if (params.header && typeof params.header !== 'string') {
			const header = {
				uri: params.header?.uri,
				type: params.header?.type,
				name: params.header?.uri?.split('/').pop(),
			};
			formData.append('header', header);
		}
		if (params.display_name) {
			formData.append('display_name', params.display_name);
		}
		if (params.note) {
			formData.append('note', params.note);
		}
		if (params.fields_attributes) {
			formData.append(
				'fields_attributes[0][name]',
				params.fields_attributes[0].name,
			);
			formData.append(
				'fields_attributes[0][value]',
				params.fields_attributes[0].value,
			);
			formData.append(
				'fields_attributes[1][name]',
				params.fields_attributes[1].name,
			);
			formData.append(
				'fields_attributes[1][value]',
				params.fields_attributes[1].value,
			);
			formData.append(
				'fields_attributes[2][name]',
				params.fields_attributes[2].name,
			);
			formData.append(
				'fields_attributes[2][value]',
				params.fields_attributes[2].value,
			);
			formData.append(
				'fields_attributes[3][name]',
				params.fields_attributes[3].name,
			);
			formData.append(
				'fields_attributes[3][value]',
				params.fields_attributes[3].value,
			);
			formData.append(
				'fields_attributes[4][name]',
				params.fields_attributes[4].name,
			);
			formData.append(
				'fields_attributes[4][value]',
				params.fields_attributes[4].value,
			);
			formData.append(
				'fields_attributes[5][name]',
				params.fields_attributes[5].name,
			);
			formData.append(
				'fields_attributes[5][value]',
				params.fields_attributes[5].value,
			);
			formData.append(
				'fields_attributes[6][name]',
				params.fields_attributes[6].name,
			);
			formData.append(
				'fields_attributes[6][value]',
				params.fields_attributes[6].value,
			);
			formData.append(
				'fields_attributes[7][name]',
				params.fields_attributes[7].name,
			);
			formData.append(
				'fields_attributes[7][value]',
				params.fields_attributes[7].value,
			);
			formData.append(
				'fields_attributes[8][name]',
				params.fields_attributes[8].name,
			);
			formData.append(
				'fields_attributes[8][value]',
				params.fields_attributes[8].value,
			);
		}

		const resp: AxiosResponse<Pathchwork.Account> = await instance.patch(
			appendApiVersion(`accounts/update_credentials`, 'v1'),
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};
