import { create } from 'zustand';

type ManageAttachmentState = {
	mediaModal: boolean;
	selectedMedia: string;
	actions: {
		onToggleMediaModal: () => void;
		onSelectMedia: (media: string) => void;
	};
};

export const useManageAttachmentStore = create<ManageAttachmentState>()(
	set => ({
		mediaModal: false,
		selectedMedia: '',
		actions: {
			onToggleMediaModal: () =>
				set(state => ({ mediaModal: !state.mediaModal })),
			onSelectMedia: media => set(() => ({ selectedMedia: media })),
		},
	}),
);

export const useManageAttachmentActions = () =>
	useManageAttachmentStore(state => state.actions);
