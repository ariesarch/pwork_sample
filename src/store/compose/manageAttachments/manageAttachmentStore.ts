import { Asset } from 'react-native-image-picker';
import { create } from 'zustand';

type ManageAttachmentState = {
	mediaModal: boolean;
	selectedMedia: Asset[];
	actions: {
		onToggleMediaModal: () => void;
		onSelectMedia: (media: Asset[]) => void;
	};
};

export const useManageAttachmentStore = create<ManageAttachmentState>()(
	set => ({
		mediaModal: false,
		selectedMedia: [],
		actions: {
			onToggleMediaModal: () =>
				set(state => ({ mediaModal: !state.mediaModal })),
			onSelectMedia: media => set(() => ({ selectedMedia: media })),
		},
	}),
);

export const useManageAttachmentActions = () =>
	useManageAttachmentStore(state => state.actions);
