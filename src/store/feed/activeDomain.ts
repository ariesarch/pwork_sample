import { create } from 'zustand';

// type ActiveDomain = {
// 	domain_name: string;
// };

type ActiveDomainComposeState = {
	domain_name: string;
	actions: {
		setDomain: (domain: string) => void;
		clearDomain: (domain: string) => void;
	};
};

export const useActiveDomainStore = create<ActiveDomainComposeState>()(set => ({
	domain_name: '',
	actions: {
		setDomain: domain => set(state => ({ ...state, domain_name: domain })),
		clearDomain: () => set(state => ({ ...state, domain_name: '' })),
	},
}));

export const useSelectedDomain = () =>
	useActiveDomainStore(state => state.domain_name);

export const useActiveDomainAction = () =>
	useActiveDomainStore(state => state.actions);
