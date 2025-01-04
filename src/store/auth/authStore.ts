import { create } from 'zustand';

export type AuthState = {
	access_token: string | undefined;
	userInfo: Patchwork.Account | undefined;
	actions: {
		setAuthToken: (token: string) => void;
		clearAuthState: () => void;
		setUserInfo: (user: Patchwork.Account) => void;
	};
};

export const useAuthStore = create<AuthState>()(set => ({
	access_token: undefined,
	userInfo: undefined,
	actions: {
		setAuthToken: token => set(state => ({ ...state, access_token: token })),
		clearAuthState: () =>
			set(state => ({
				...state,
				access_token: undefined,
			})),
		setUserInfo: (user: Patchwork.Account) =>
			set(state => ({ ...state, userInfo: user })),
	},
}));

export const useAuthStoreAction = () => useAuthStore(state => state.actions);
