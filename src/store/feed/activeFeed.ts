import { DEFAULT_API_URL } from '@/util/constant';
import { create } from 'zustand';

type ActiveFeedState = {
	activeFeed: Pathchwork.Status | undefined;
	actions: {
		setActiveFeed: (feed: Pathchwork.Status) => void;
		changeActiveFeedReplyCount: (
			operationType: 'increase' | 'decrease',
		) => void;
		clearFeed: (feed: Pathchwork.Status) => void;
	};
};

export const useActiveDomainStore = create<ActiveFeedState>()(set => ({
	activeFeed: undefined,
	actions: {
		setActiveFeed: feed => set(state => ({ ...state, activeFeed: feed })),
		clearFeed: () => set(state => ({ ...state, activeFeed: undefined })),
		changeActiveFeedReplyCount: operationType =>
			set(state => {
				if (state.activeFeed) {
					return {
						activeFeed: {
							...state.activeFeed,
							replies_count:
								operationType == 'increase'
									? state.activeFeed.replies_count + 1
									: state.activeFeed.replies_count - 1,
						},
					};
				}
				return state;
			}),
	},
}));

export const useCurrentActiveFeed = () =>
	useActiveDomainStore(state => state.activeFeed);

export const useActiveFeedAction = () =>
	useActiveDomainStore(state => state.actions);
