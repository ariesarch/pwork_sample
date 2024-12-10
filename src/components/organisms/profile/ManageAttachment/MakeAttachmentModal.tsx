import React from 'react';
import { Platform, View } from 'react-native';
import { Button } from '@/components/atoms/common/Button/Button';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import {
	hasCameraPermission,
	hasMediaPermissions,
} from '@/util/helper/permission';
import {
	ComposeCameraIcon,
	ComposeOpenGalleryIcon,
} from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';
import { useProfileMediaActions } from '@/store/profile/useProfileMediaStore';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import { PreviewImageIcon } from '@/util/svg/icon.profile';
import { useNavigation } from '@react-navigation/native';

type ManageAttachmentModalProps = {
	type: 'header' | 'avatar';
	onToggleMediaModal: () => void;
	imageUrl: string | null;
	canPreview: boolean;
};
const ManageAttachmentModal = ({
	type,
	onToggleMediaModal,
	imageUrl,
	canPreview,
}: ManageAttachmentModalProps) => {
	const { colorScheme } = useColorScheme();
	const { onSelectMedia } = useProfileMediaActions();
	const navigation = useNavigation();

	const onPressCamera = async () => {
		if (Platform.OS === 'android' && !(await hasCameraPermission())) {
			return;
		}
		ImagePicker.openCamera({
			width: type === 'avatar' ? 300 : 1600,
			height: type === 'avatar' ? 300 : 700,
			cropping: true,
		})
			.then(response => {
				onToggleMediaModal();
				onSelectMedia(type, [
					{
						uri: response.path,
						type: response.mime,
						fileName: response.path.split('/').pop(),
					},
				]);
			})
			.catch(error => {
				Toast.show({
					type: 'error',
					text1: error?.message || 'Something went wrong!',
					position: 'top',
					visibilityTime: 1000,
					onHide: () => {},
				});
			});
	};

	const onPressGallery = async () => {
		if (Platform.OS === 'android' && !(await hasMediaPermissions())) {
			return;
		}
		ImagePicker.openPicker({
			width: type === 'avatar' ? 300 : 1600,
			height: type === 'avatar' ? 300 : 700,
			cropping: true,
		})
			.then(response => {
				onToggleMediaModal();
				onSelectMedia(type, [
					{
						uri: response.path,
						type: response.mime,
						fileName: response.path.split('/').pop(),
					},
				]);
			})
			.catch(error => {
				Toast.show({
					type: 'error',
					text1: error?.message || 'Something went wrong!',
					position: 'top',
					visibilityTime: 1000,
					onHide: () => {},
				});
			});
	};

	const onPressPreview = () => {
		if (imageUrl) {
			navigation.navigate('LocalImageViewer', {
				imageUrl: {
					url: imageUrl,
				},
			});
		}
		onToggleMediaModal();
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
			<View className="flex-row items-center justify-between">
				{canPreview && imageUrl && (
					<Button
						className="flex-1 flex-row items-center justify-center px-4 py-2 flex-shrink-0 border border-gray-300 rounded-md mb-4"
						variant="outline"
						onPress={onPressPreview}
					>
						<PreviewImageIcon />
						<ThemeText className="text-white pl-2">Preview Image</ThemeText>
					</Button>
				)}
			</View>
		</View>
	);
};

export default ManageAttachmentModal;
