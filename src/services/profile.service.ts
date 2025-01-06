import { QueryFunctionContext } from '@tanstack/react-query';
import {
	AccountInfoQueryKey,
	CheckRelationshipQueryKey,
	FollowerAccountsQueryKey,
	FollowingAccountsQueryKey,
	SpecificServerProfileQueryKey,
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
		const resp: AxiosResponse<Patchwork.Account> = await instance.get(
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

export const getSpecificServerProfile = async (
	qfContext: QueryFunctionContext<SpecificServerProfileQueryKey>,
) => {
	try {
		const { q } = qfContext.queryKey[1];
		const resp: AxiosResponse<Patchwork.SearchResult> = await instance.get(
			appendApiVersion(`search`, 'v2'),
			{
				params: { q: q, resolve: true, type: 'accounts' },
			},
		);
		return resp.data;
	} catch (e) {
		return handleError(e);
	}
};

export const checkRelationshipQueryFn = async (
	qfContext: QueryFunctionContext<CheckRelationshipQueryKey>,
) => {
	try {
		const { accountIds } = qfContext.queryKey[1];
		const resp: AxiosResponse<Patchwork.RelationShip[]> = await instance.get(
			appendApiVersion(`accounts/relationships`, 'v1'),
			{
				params: { with_suspended: true, id: accountIds },
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
		const resp: AxiosResponse<Patchwork.RelationShip> = await instance.post(
			appendApiVersion(`accounts/${accountId}/${relation}`, 'v1'),
			!isFollowing && { reblogs: true },
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const followRequestsQueryFn = async ({
	accountId,
	requestType,
}: {
	accountId: string;
	requestType: 'authorize' | 'reject';
}) => {
	try {
		const resp: AxiosResponse<Patchwork.RelationShip> = await instance.post(
			appendApiVersion(`follow_requests/${accountId}/${requestType}`, 'v1'),
		);
		return resp.data;
	} catch (error) {
		return handleError(error);
	}
};

export const getFollowingAccountsQueryFn = async (
	qfContext: QueryFunctionContext<FollowingAccountsQueryKey>,
) => {
	try {
		const { domain_name, accountId } = qfContext.queryKey[1];
		const max_id = qfContext.pageParam as string;

		const resp: AxiosResponse<Patchwork.Status[]> = await instance.get(
			appendApiVersion(`accounts/${accountId}/following`),
			{
				params: {
					domain_name,
					isDynamicDomain: true,
					max_id,
				},
			},
		);
		const linkHeader = resp.headers.link as string;
		let maxId = null;
		if (linkHeader) {
			const regex = /max_id=(\d+)/;
			const match = linkHeader.match(regex);
			if (match) {
				maxId = match[1];
			}
		}

		return {
			data: resp.data,
			links: { next: { max_id: maxId } },
		};
	} catch (e) {
		return handleError(e);
	}
};

export const getFollowerAccountsQueryFn = async (
	qfContext: QueryFunctionContext<FollowerAccountsQueryKey>,
) => {
	try {
		const { domain_name, accountId } = qfContext.queryKey[1];
		const max_id = qfContext.pageParam as string;

		const resp: AxiosResponse<Patchwork.Status[]> = await instance.get(
			appendApiVersion(`accounts/${accountId}/followers`),
			{
				params: {
					domain_name,
					isDynamicDomain: true,
					max_id,
				},
			},
		);
		const linkHeader = resp.headers.link as string;
		let maxId = null;
		if (linkHeader) {
			const regex = /max_id=(\d+)/;
			const match = linkHeader.match(regex);
			if (match) {
				maxId = match[1];
			}
		}

		return {
			data: resp.data,
			links: { next: { max_id: maxId } },
		};
	} catch (e) {
		return handleError(e);
	}
};

// type ProfileDetailStatusResponse = {
// 	statuses_data: Patchwork.Status[];
// 	meta: {
// 		pagination: { total_objects: number | null; has_more_objects: boolean };
// 	};
// };

// export const getProfileDetailStatus = async ({
// 	queryKey,
// }: QueryFunctionContext<ProfileDetailStatusQueryKey>) => {
// 	try {
// 		const [, params] = queryKey;
// 		const { id } = params;
// 		const resp = await axios.get<ProfileDetailStatusResponse>(
// 			`https://backend.newsmast.org/api/v1/users/get_profile_detail_statuses_by_account`,
// 			{
// 				params: { id: id.toString() },
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			},
// 		);
// 		return resp.data.statuses_data;
// 	} catch (e) {
// 		return handleError(e);
// 	}
// };

export const updateProfile = async (
	params: UpdateProfilePayload,
): Promise<Patchwork.Account> => {
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

		const resp: AxiosResponse<Patchwork.Account> = await instance.patch(
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

export const deleteProfileMedia = async ({
	mediaType,
}: {
	mediaType: 'avatar' | 'header';
}): Promise<Patchwork.Account> => {
	const endpoint = mediaType === 'avatar' ? 'profile/avatar' : 'profile/header';
	const resp: AxiosResponse<Patchwork.Account> = await instance.delete(
		appendApiVersion(endpoint, 'v1'),
	);
	return resp.data;
};
