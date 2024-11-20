import React, { useState } from 'react';
import { View, Pressable, Platform, PermissionsAndroid } from 'react-native';
import {
	ComposeGlobeIcon,
	ComposeLinkIcon,
	ComposeGalleryIcon,
	ComposeGifIcon,
	ComposeLocationIcon,
	ComposePlusIcon,
	ComposePollIcon,
} from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';
import styles from './ComposeActionsBar.style';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import CallToAction from '@/components/organisms/compose/CallToAction/CallToAction';
import VisibilitySettings from '@/components/organisms/compose/VisibilitySettings/VisibilitySettings';
import ManageAttachmentModal from '@/components/organisms/compose/modal/ManageAttachment/MakeAttachmentModal';
import {
	useManageAttachmentActions,
	useManageAttachmentStore,
} from '@/store/compose/manageAttachments/manageAttachmentStore';

const requestCameraPermission = async () => {
	if (Platform.OS === 'android') {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				return true;
			}
		} catch (err) {
			console.warn('🚀 ~ requestCameraPermission ~ err:', err);
		}
	}
};

const ComposeActionsBar = () => {
	console.log('🚀 ~ ComposeActionsBar ~ ComposeActionsBar:');

	const { colorScheme } = useColorScheme();

	const mediaModal = useManageAttachmentStore(state => state.mediaModal);
	const { onToggleMediaModal } = useManageAttachmentActions();

	const [ctaModalVisible, setCTAModalVisible] = useState(false);
	const [postVisibilityModalVisible, setPostVisibilityModalVisible] =
		useState(false);

	return (
		<View>
			<View className={styles.container}>
				<Pressable
					onPress={onToggleMediaModal}
					className={'mr-3'}
					children={<ComposeGalleryIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<ComposeGifIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<ComposeLocationIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<ComposePollIcon {...{ colorScheme }} />}
				/>
				<Pressable
					onPress={() => setPostVisibilityModalVisible(true)}
					className={'mr-3'}
					children={<ComposeGlobeIcon forceLight />}
				/>
				<Pressable
					onPress={() => setCTAModalVisible(true)}
					className={'mr-3'}
					children={<ComposeLinkIcon {...{ colorScheme }} />}
				/>
				<View className="flex-1 items-end">
					<View className="flex-row items-center">
						<ComposePlusIcon />
						<ThemeText className="ml-2 text-white">Long Post</ThemeText>
					</View>
				</View>
			</View>

			{/****** Manage Attachments ( Photos and Videos ) ******/}
			<ThemeModal
				isFlex
				hasNotch={false}
				{...{
					openThemeModal: mediaModal,
					onCloseThemeModal: () => onToggleMediaModal(),
				}}
				containerStyle={{ borderRadius: 24 }}
			>
				<ManageAttachmentModal />
			</ThemeModal>
			{/****** Manage Attachments ( Photos and Videos ) ******/}

			{/****** Visibility Settings ******/}
			<ThemeModal
				hasNotch={false}
				parentPaddingEnabled={false}
				containerStyle={{
					marginHorizontal: 16,
					marginBottom: 20,
				}}
				{...{
					openThemeModal: postVisibilityModalVisible,
					onCloseThemeModal: () => setPostVisibilityModalVisible(false),
				}}
			>
				<VisibilitySettings
					onClose={() => setPostVisibilityModalVisible(false)}
				/>
			</ThemeModal>
			{/****** Visibility Settings ******/}

			{/****** CallToAction ******/}
			<ThemeModal
				isFlex
				hasNotch={false}
				{...{
					openThemeModal: ctaModalVisible,
					onCloseThemeModal: () => setCTAModalVisible(false),
				}}
				containerStyle={{ borderRadius: 24 }}
			>
				<CallToAction onClose={() => setCTAModalVisible(false)} />
			</ThemeModal>
			{/****** CallToAction ******/}
		</View>
	);
};

export default ComposeActionsBar;
