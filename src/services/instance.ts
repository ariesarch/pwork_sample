import { useSubChannelStatusStore } from '@/store/feed/subChannelStatusStore';
import { DEFAULT_API_URL } from '@/util/constant';
import {
	ensureHttp,
	getAuthState,
	getSpecificServerStatus,
	replaceIdInUrl,
} from '@/util/helper/helper';
import axios from 'axios';
import { report } from 'process';

const baseURL = `${process.env.API_URL ?? DEFAULT_API_URL}`;

const instance = axios.create({
	baseURL,
});

instance.interceptors.request.use(async config => {
	const { access_token: token, domain: userDomain } = await getAuthState();
	console.log('userDomain::', userDomain, config.params);
	if (token && token.length > 0) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	if (config.params && config.params.hasOwnProperty('isDynamicDomain')) {
		config.baseURL = ensureHttp(config.params?.domain_name);
	}
	if (
		!config.params?.hasOwnProperty('isDynamicDomain') &&
		userDomain !== baseURL
	) {
		config.baseURL = ensureHttp(userDomain);
	}
	if (['post', 'delete'].includes(config.method ?? '') && token && config.url) {
		const uniqId = config.data?.crossChannelRequestIdentifier;

		if (!uniqId) return config;
		const state = useSubChannelStatusStore.getState();
		const subChannelStatusData = state.data[uniqId];

		if (subChannelStatusData) {
			const { status: subChannelStatus, specificPayloadMapping } =
				subChannelStatusData;
			if (subChannelStatus) {
				const searchRes = await getSpecificServerStatus(
					subChannelStatus.url,
					token,
				);
				const mainServerStatus = searchRes.statuses[0];
				config.url = replaceIdInUrl(config.url, searchRes);

				if (specificPayloadMapping && mainServerStatus) {
					Object.entries(specificPayloadMapping).forEach(
						([payloadKey, serverResponseKey]) => {
							if (
								config.data &&
								payloadKey in config.data &&
								serverResponseKey in mainServerStatus
							) {
								//@ts-expect-error
								config.data[payloadKey] = mainServerStatus[serverResponseKey];
							}
						},
					);
				}
			}
		}
	}
	return config;
});

instance.interceptors.response.use(async response => {
	try {
		if (response.config.method == 'post') {
			const requestPayload = JSON.parse(response?.config?.data);
			const uniqId = requestPayload?.crossChannelRequestIdentifier;

			if (!uniqId) return response;
			const state = useSubChannelStatusStore.getState();
			const subChannelStatusData = state.data[uniqId];

			if (subChannelStatusData) {
				const { savedPayload, specificResponseMapping } = subChannelStatusData;

				if (savedPayload && specificResponseMapping) {
					Object.entries(specificResponseMapping).forEach(
						([payloadKey, responseKey]) => {
							if (
								savedPayload[payloadKey] !== undefined &&
								response.data[responseKey] !== undefined
							) {
								response.data[responseKey] = savedPayload[payloadKey];
							}
						},
					);
				}
			}
		}
	} catch (e) {
		return response;
	}
	return response;
});

export default instance;
