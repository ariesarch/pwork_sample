import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
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
import PollModal from '@/components/organisms/compose/modal/Poll/PollModal';
import { usePollStore } from '@/store/compose/poll/pollStore';

const ComposeActionsBar = () => {
	const { colorScheme } = useColorScheme();

	const mediaModal = useManageAttachmentStore(state => state.mediaModal);
	const { onToggleMediaModal } = useManageAttachmentActions();

	const isPollCreated = usePollStore(state => state.isPollCreated);
	const [isPollModalVisible, setPollModalVisible] = useState(false);

	const [postVisibilityModalVisible, setPostVisibilityModalVisible] =
		useState(false);
	const [ctaModalVisible, setCTAModalVisible] = useState(false);

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
					onPress={() => setPollModalVisible(true)}
					className={'mr-3'}
					children={
						<ComposePollIcon
							{...{ colorScheme }}
							stroke={isPollCreated ? '#FF3C26' : '#FFFFFF'}
						/>
					}
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
				hasNotch={false}
				{...{
					openThemeModal: mediaModal,
					onCloseThemeModal: () => onToggleMediaModal(),
				}}
				modalPositionStyle={{
					justifyContent: 'flex-end',
				}}
				containerStyle={{ borderRadius: 0 }}
			>
				<ManageAttachmentModal {...{ onToggleMediaModal }} />
			</ThemeModal>
			{/****** Manage Attachments ( Photos and Videos ) ******/}

			{/****** Poll ******/}
			<PollModal
				visible={isPollModalVisible}
				onClose={() => setPollModalVisible(false)}
			/>
			{/****** Poll ******/}

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
