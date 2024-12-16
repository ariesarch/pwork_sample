import { QueryFunctionContext } from '@tanstack/react-query';
import {
	AccountInfoQueryKey,
	CheckRelationshipQueryKey,
	UpdateProfilePayload,
} from '@/types/queries/profile.type';
import { appendApiVersion, handleError } from '@/util/helper/helper';
import axios, { AxiosResponse } from 'axios';
import instance from './instance';

export const accountInfoQueryFn = async ({
	queryKey,
}: QueryFunctionContext<AccountInfoQueryKey>) => {
	try {
		const { id, domain_name } = queryKey[1];
		const resp: AxiosResponse<Pathchwork.Account> = await instance.get(
			appendApiVersion(`accounts/${id}`, 'v1'),
			{
				params: {
					domain_name,
					isDynamicDomain: true,
				},
			},
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};
// export const getRelationships = async (accountIds: string[]): Promise<any[]> => {
//   const response = await apiClient.get('/accounts/relationships', {
//     params: { id: accountIds },
//   });
//   return response.data;
// };

export const checkRelationshipQueryFn = async ({
	queryKey,
}: QueryFunctionContext<CheckRelationshipQueryKey>) => {
	try {
		const { accountIds } = queryKey[1];
		const resp: AxiosResponse<Pathchwork.RelationShip[]> = await instance.get(
			appendApiVersion(`accounts/relationships`, 'v1'),
			{
				params: { id: accountIds },
			},
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};

export const relationshipQueryFn = async ({
	accountId,
	isFollowing,
}: {
	accountId: string;
	isFollowing: boolean;
}) => {
	try {
		const relation = isFollowing ? 'unfollow' : 'follow';
		const resp: AxiosResponse<Pathchwork.RelationShip> = await instance.post(
			appendApiVersion(`accounts/${accountId}/${relation}`, 'v1'),
			!isFollowing && { reblogs: true },
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
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
		formData.append('display_name', params.display_name);
		formData.append('note', params.note);
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
