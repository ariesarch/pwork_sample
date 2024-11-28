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
import ManageAttachmentModal from '@/components/organisms/compose/modal/ManageAttachment/MakeAttachmentModal';
import {
	useManageAttachmentActions,
	useManageAttachmentStore,
} from '@/store/compose/manageAttachments/manageAttachmentStore';
import PollModal from '@/components/organisms/compose/modal/Poll/PollModal';
import { usePollStore } from '@/store/compose/poll/pollStore';
import CallToActionModal from '@/components/organisms/compose/modal/CallToAction/CallToActionModal';
import {
	useCTAactions,
	useCallToActionStore,
} from '@/store/compose/callToAction/callToActionStore';
import {
	useVisibilitySettingsActions,
	useVisibilitySettingsStore,
} from '@/store/compose/visibilitySettings/visibilitySettingsStore';
import VisibilitySettingsModal from '@/components/organisms/compose/modal/VisibilitySettings/VisibilitySettingsModal';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { initialState } from '@/context/composeStatusContext/composeStatus.reducer';

const ComposeActionsBar = () => {
	const { colorScheme } = useColorScheme();
	const { composeState, composeDispatch } = useComposeStatus();

	// ****** Media Store ****** //
	const mediaModal = useManageAttachmentStore(state => state.mediaModal);
	const { onToggleMediaModal } = useManageAttachmentActions();
	// ****** Media Store ****** //

	// ****** Poll Store ****** //
	const isPollCreated = usePollStore(state => state.isPollCreated);
	const [isPollModalVisible, setPollModalVisible] = useState(false);
	// ****** Poll Store ****** //

	// ****** Visibility Store ****** //
	const visibilityModalVisible = useVisibilitySettingsStore(
		state => state.visibilityModalVisible,
	);
	const { onToggleVisibilityModal } = useVisibilitySettingsActions();
	// ****** Visibility Store ****** //

	// ****** CTA Store ****** //
	const ctaModalVisible = useCallToActionStore(state => state.ctaModalVisible);
	const { onToggleCTAModal } = useCTAactions();
	// ****** CTA Store ****** //

	const MAX_CHAR = 4000;

	return (
		<View>
			<View className={styles.container}>
				{/****** Media Upload Action ******/}
				<Pressable
					onPress={onToggleMediaModal}
					className={'mr-3'}
					children={<ComposeGalleryIcon {...{ colorScheme }} />}
				/>
				{/****** Media Upload Action ******/}

				<Pressable
					className={'mr-3'}
					children={<ComposeGifIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<ComposeLocationIcon {...{ colorScheme }} />}
				/>
				{/****** Poll Action ******/}
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
				{/****** Poll Action ******/}

				{/****** Visibility Settings Action ******/}
				<Pressable
					onPress={onToggleVisibilityModal}
					className={'mr-3'}
					children={<ComposeGlobeIcon forceLight />}
				/>
				{/****** Visibility Settings Action ******/}

				{/****** CTA Action ******/}
				<Pressable
					onPress={onToggleCTAModal}
					className={'mr-3'}
					children={<ComposeLinkIcon {...{ colorScheme }} />}
				/>
				{/****** CTA Action ******/}

				{/****** Long Post Action ******/}
				{composeState?.maxCount === 500 ? (
					<View className="flex-1 items-end">
						<View className="flex-row items-center">
							<ThemeText className="mr-3 text-white">
								{composeState.text.count ? 500 - composeState.text.count : 500}
							</ThemeText>
							<Pressable
								className="flex-row items-center"
								onPress={() =>
									composeDispatch({ type: 'maxCount', payload: MAX_CHAR })
								}
							>
								<ComposePlusIcon />
								<ThemeText className="ml-2 text-white">Long Post</ThemeText>
							</Pressable>
						</View>
					</View>
				) : (
					<View className="flex-1 items-end">
						<Pressable
							className="flex-row items-center"
							onPress={() =>
								composeDispatch({
									type: 'maxCount',
									payload: 500,
								})
							}
						>
							<ThemeText className="ml-2 text-white">
								{composeState.text.count
									? MAX_CHAR - composeState.text.count
									: MAX_CHAR}
							</ThemeText>
						</Pressable>
					</View>
				)}

				{/****** Long Post Action ******/}
			</View>

			{/****** Manage Attachments ( Photos and Videos ) Modal ******/}
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
			{/****** Manage Attachments ( Photos and Videos ) Modal ******/}

			{/****** Poll Modal ******/}
			<PollModal
				visible={isPollModalVisible}
				onClose={() => setPollModalVisible(false)}
			/>
			{/****** Poll Modal ******/}

			{/****** Visibility Settings Modal ******/}
			<VisibilitySettingsModal
				visible={visibilityModalVisible}
				onClose={onToggleVisibilityModal}
			/>
			{/****** Visibility Settings Modal ******/}

			{/****** CTA Modal ******/}
			<CallToActionModal visible={ctaModalVisible} onClose={onToggleCTAModal} />
			{/****** CTA Modal ******/}
		</View>
	);
};

export default ComposeActionsBar;
