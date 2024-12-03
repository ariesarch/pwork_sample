import { DEFAULT_API_URL } from '@/util/constant';
import { create } from 'zustand';

type ActiveFeedState = {
	activeFeed: Pathchwork.Status | undefined;
	actions: {
		setActiveFeed: (feed: Pathchwork.Status) => void;
		clearFeed: () => void;
	};
};

export const useActiveDomainStore = create<ActiveFeedState>()(set => ({
	activeFeed: undefined,
	actions: {
		setActiveFeed: feed => set(state => ({ ...state, activeFeed: feed })),
		clearFeed: () => set(state => ({ ...state, activeFeed: undefined })),
	},
}));

export const useCurrentActiveFeed = () =>
	useActiveDomainStore(state => state.activeFeed);

export const useActiveFeedAction = () =>
	useActiveDomainStore(state => state.actions);
