import { DEFAULT_API_URL } from '@/util/constant';
import { ensureHttp } from '@/util/helper/helper';
import { create } from 'zustand';

export type AuthState = {
	access_token: string | undefined;
	userInfo: Patchwork.Account | undefined;
	userOriginInstance: string;
	actions: {
		setAuthToken: (token: string) => void;
		clearAuthState: () => void;
		setUserInfo: (user: Patchwork.Account) => void;
		setUserOriginInstance: (userOrigin: string) => void;
	};
};

const default_instance = `${process.env.API_URL || DEFAULT_API_URL}`;

export const useAuthStore = create<AuthState>()(set => ({
	access_token: undefined,
	userInfo: undefined,
	userOriginInstance: default_instance,
	actions: {
		setAuthToken: token => set(state => ({ ...state, access_token: token })),
		clearAuthState: () =>
			set(state => ({
				...state,
				access_token: undefined,
				userOriginInstance: default_instance,
			})),
		setUserInfo: (user: Patchwork.Account) =>
			set(state => ({ ...state, userInfo: user })),
		setUserOriginInstance: (domain: string) =>
			set(state => ({ ...state, userOriginInstance: ensureHttp(domain) })),
	},
}));

export const useAuthStoreAction = () => useAuthStore(state => state.actions);
