import { DEFAULT_API_URL } from '@/util/constant';
import { create } from 'zustand';

type ExtraPayloadType =
	| {
			comeFrom: 'other' | 'noti' | 'hashtag';
			carriedPayload?: Record<string, any>;
	  }
	| undefined;

type ActiveFeedState = {
	activeFeed: Pathchwork.Status | undefined;
	extraPayload: ExtraPayloadType;
	actions: {
		setActiveFeed: (feed: Pathchwork.Status) => void;
		changeActiveFeedReplyCount: (
			operationType: 'increase' | 'decrease',
		) => void;
		setExtraPayload: (payload: ExtraPayloadType) => void;
		clearFeed: () => void;
	};
};

export const useActiveFeedStore = create<ActiveFeedState>()(set => ({
	activeFeed: undefined,
	extraPayload: undefined,
	actions: {
		setActiveFeed: feed => set(state => ({ ...state, activeFeed: feed })),
		clearFeed: () =>
			set(state => ({
				...state,
				activeFeed: undefined,
				extraPayload: undefined,
			})),
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
		setExtraPayload: payload =>
			set(state => ({ ...state, extraPayload: payload })),
	},
}));

export const useCurrentActiveFeed = () =>
	useActiveFeedStore(state => state.activeFeed);

export const useActiveFeedAction = () =>
	useActiveFeedStore(state => state.actions);
