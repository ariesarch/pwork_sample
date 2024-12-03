import { create } from 'zustand';

interface Store {
	userInfo: Pathchwork.Account | null;
	setUserInfo: (info: Pathchwork.Account) => void;
}

export const useUserInfo = create<Store>(set => ({
	userInfo: null,
	setUserInfo: info =>
		set(() => ({
			userInfo: info,
		})),
}));
