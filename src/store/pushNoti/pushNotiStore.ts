import { create } from 'zustand';

type PushNotificationState = {
	fcmToken: string | null;
	actions: {
		saveFcmToken: (token: string | null) => void;
	};
};

export const usePushNoticationStore = create<PushNotificationState>()(set => ({
	fcmToken: null,
	actions: {
		saveFcmToken: fcmToken => set({ fcmToken }),
	},
}));

export const usePushNoticationActions = () =>
	usePushNoticationStore(state => state.actions);
