import { create } from 'zustand';

type VisibilitySettingsState = {
	visibilityModalVisible: boolean;
	visibility: string;
	actions: {
		onToggleVisibilityModal: () => void;
		setVisibility: (i: string) => void;
	};
};

export const useVisibilitySettingsStore = create<VisibilitySettingsState>()(
	set => ({
		visibilityModalVisible: false,
		visibility: 'Local only',
		actions: {
			onToggleVisibilityModal: () =>
				set(state => ({
					visibilityModalVisible: !state.visibilityModalVisible,
				})),
			setVisibility: visibility => set({ visibility }),
		},
	}),
);

export const useVisibilitySettingsActions = () =>
	useVisibilitySettingsStore(state => state.actions);
