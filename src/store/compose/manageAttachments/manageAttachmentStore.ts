import { Asset } from 'react-native-image-picker';
import { create } from 'zustand';

type ManageAttachmentState = {
	mediaModal: boolean;
	selectedMedia: Asset[] | Pathchwork.Attachment[];
	progress: { currentIndex: number | undefined; progress: number };
	actions: {
		onToggleMediaModal: () => void;
		onSelectMedia: (media: Asset[] | Pathchwork.Attachment[]) => void;
		onremoveMedia: (index: number) => void;
		onAddMedia: (media: Asset | Asset[]) => void;
		onProgressChange: (progress: number) => void;
		onProgressIndexChange: (inde: number | undefined) => void;
		resetAttachmentStore: () => void;
	};
};

export const useManageAttachmentStore = create<ManageAttachmentState>()(
	set => ({
		mediaModal: false,
		selectedMedia: [],
		progress: { currentIndex: undefined, progress: 0 },
		actions: {
			onToggleMediaModal: () =>
				set(state => ({ mediaModal: !state.mediaModal })),
			onSelectMedia: media => set(() => ({ selectedMedia: media })),
			onremoveMedia: (removeIndex: number) =>
				set(state => {
					return {
						selectedMedia: state.selectedMedia.filter(
							(item, index) => index !== removeIndex,
						),
					};
				}),
			onAddMedia: media => {
				const normalizedMedia = Array.isArray(media) ? media : [media];
				return set(state => ({
					selectedMedia: [...state.selectedMedia, ...normalizedMedia],
				}));
			},
			onProgressChange: currentProgress =>
				set(state => ({
					progress: {
						currentIndex: state.progress?.currentIndex,
						progress: Math.max(state.progress?.progress, currentProgress),
					},
				})),
			onProgressIndexChange: currentIndex =>
				set(() => ({ progress: { currentIndex, progress: 0 } })),
			resetAttachmentStore: () =>
				set(() => ({
					mediaModal: false,
					selectedMedia: [],
					progress: { currentIndex: undefined, progress: 0 },
				})),
		},
	}),
);

export const useManageAttachmentActions = () =>
	useManageAttachmentStore(state => state.actions);
