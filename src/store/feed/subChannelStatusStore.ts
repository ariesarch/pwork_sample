import { create } from 'zustand';

type SubChannelStatus = {
	status: Pathchwork.Status | undefined;
	savedPayload: Record<string, any> | undefined;
	specificPayloadMapping?: Record<string, any>; // Key: payload param to replace, Value: search result value
	specificResponseMapping?: Record<string, any>;
	crossChannelRequestIdentifier: undefined | string;
};

type SubChannelStatusState = {
	data: Record<string, SubChannelStatus>;
	actions: {
		saveStatus: (uniqId: string, data: SubChannelStatus) => void;
		clearStatus: (uniqId: string) => void;
		clearAllStatuses: () => void;
	};
};

export const useSubChannelStatusStore = create<SubChannelStatusState>()(
	set => ({
		data: {},
		actions: {
			saveStatus: (uniqId, newData) =>
				set(state => ({
					data: {
						...state.data,
						[uniqId]: newData,
					},
				})),
			clearStatus: uniqId =>
				set(state => {
					const newData = { ...state.data };
					delete newData[uniqId];
					return { data: newData };
				}),
			clearAllStatuses: () => set({ data: {} }),
		},
	}),
);

export const useSelectedSubchannelStatus = (uniqId: string) =>
	useSubChannelStatusStore(state => state.data[uniqId]);

export const useSubchannelStatusActions = () =>
	useSubChannelStatusStore(state => state.actions);
