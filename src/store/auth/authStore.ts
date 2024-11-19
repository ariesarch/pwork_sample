import { create } from 'zustand';

export type AuthState = {
	access_token: string | undefined;
	actions: {
		setAuthToken: (token: string) => void;
		clearAuthToken: () => void;
	};
};

export const useAuthStore = create<AuthState>()(set => ({
	access_token: '',
	actions: {
		setAuthToken: token => set(state => ({ ...state, access_token: token })),
		clearAuthToken: () => set(state => ({ ...state, access_token: undefined })),
	},
}));

export const useAuthStoreAction = () => useAuthStore(state => state.actions);
