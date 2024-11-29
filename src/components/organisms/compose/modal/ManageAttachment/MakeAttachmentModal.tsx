import React from 'react';
import { Platform, View } from 'react-native';
import {
	Asset,
	launchCamera,
	launchImageLibrary,
} from 'react-native-image-picker';
import { Button } from '@/components/atoms/common/Button/Button';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import {
	useManageAttachmentActions,
	useManageAttachmentStore,
} from '@/store/compose/manageAttachments/manageAttachmentStore';
import { mediaUploadAction } from '@/util/helper/mediaUploadActions';
import {
	hasCameraPermission,
	hasMediaPermissions,
} from '@/util/helper/permission';
import {
	ComposeAddFileIcon,
	ComposeCameraIcon,
	ComposeOpenGalleryIcon,
} from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';

type ManageAttachmentModalProps = {
	onToggleMediaModal: () => void;
};
const ManageAttachmentModal = ({
	onToggleMediaModal,
}: ManageAttachmentModalProps) => {
	const { colorScheme } = useColorScheme();
	const selectedMedia = useManageAttachmentStore(state => state.selectedMedia);
	const { onSelectMedia, onAddMedia } = useManageAttachmentActions();

	const onPressCamera = async () => {
		if (Platform.OS === 'android' && !(await hasCameraPermission())) {
			return;
		}

		await launchCamera(mediaUploadAction.options, response => {
			if (response.assets) {
				onToggleMediaModal();
				selectedMedia.length > 0
					? onAddMedia(response.assets)
					: onSelectMedia(response.assets as Asset[]);
			}
		});
	};

	const onPressGallery = async () => {
		if (Platform.OS === 'android' && !(await hasMediaPermissions())) {
			return;
		}
		await launchImageLibrary(
			{
				...mediaUploadAction.options,
				mediaType: 'photo',
				selectionLimit: 4 - selectedMedia.length,
			},
			response => {
				if (response.assets) {
					onToggleMediaModal();
					selectedMedia.length > 0
						? onAddMedia(response.assets)
						: onSelectMedia(response.assets as Asset[]);
				}
			},
		);
	};

	const onPressFile = async () => {
		if (Platform.OS === 'android' && !(await hasMediaPermissions())) {
			return;
		}
		await launchImageLibrary(
			{
				...mediaUploadAction.options,
				mediaType: 'video',
				selectionLimit: 4 - selectedMedia.length,
			},
			response => {
				if (response.assets) {
					onToggleMediaModal();
					selectedMedia.length > 0
						? onAddMedia(response.assets)
						: onSelectMedia(response.assets as Asset[]);
				}
			},
		);
	};

	return (
		<View className={Platform.OS === 'ios' ? 'pb-6' : 'pb-0'}>
			<View className="flex-row items-center justify-between mb-3">
				<View className="w-1/2 gap-2">
					<Button
						className="flex-row items-center"
						variant={'outline'}
						onPress={onPressCamera}
					>
						<ComposeCameraIcon {...{ colorScheme }} />
						<ThemeText className="text-white pl-2">Take a photo</ThemeText>
					</Button>
				</View>
				<View className="w-1/2 gap-2">
					<Button
						className="flex-row items-center"
						variant={'outline'}
						onPress={onPressGallery}
					>
						<ComposeOpenGalleryIcon {...{ colorScheme }} />
						<ThemeText className="text-white pl-2">Open Gallery</ThemeText>
					</Button>
				</View>
			</View>
			<Button
				className="flex-row items-center px-10 mb-3"
				variant={'outline'}
				onPress={onPressFile}
			>
				<ComposeAddFileIcon {...{ colorScheme }} />
				<ThemeText className="text-white pl-2">Add file</ThemeText>
			</Button>
		</View>
	);
};

export default ManageAttachmentModal;
