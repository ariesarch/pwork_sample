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
	ComposePinIcon,
	ComposeUnlockIcon,
	ComposeLockIcon,
	ComposeMentionIcon,
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
import { cn } from '@/util/helper/twutil';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { POLL_INITIAL } from '@/util/constant/pollOption';
import { initialState } from '@/context/composeStatusContext/composeStatus.reducer';

const ComposeActionsBar = () => {
	const { composeState, composeDispatch } = useComposeStatus();
	const { colorScheme } = useColorScheme();
	const MAX_CHAR = 4000;
	const [isLongPost, setLongPost] = useState(false);

	// ****** Media Store ****** //
	const { mediaModal, selectedMedia, progress } = useManageAttachmentStore();
	const { onToggleMediaModal } = useManageAttachmentActions();
	const isMediaUploading = progress.currentIndex !== undefined;
	// ****** Media Store ****** //

	// ****** Poll Store ****** //
	// const [isPollModalVisible, setPollModalVisible] = useState(false);
	const onPressPoll = () => {
		if (composeState.poll) {
			composeDispatch({ type: 'poll', payload: null });
		} else {
			composeDispatch({
				type: 'poll',
				payload: POLL_INITIAL,
			});
		}
	};
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

	const getVisibilityIcon = () => {
		switch (composeState.visibility) {
			case 'public':
				return <ComposeGlobeIcon {...{ colorScheme }} />;
			case 'local':
				return <ComposePinIcon {...{ colorScheme }} />;
			case 'unlisted':
				return <ComposeUnlockIcon {...{ colorScheme }} />;
			case 'private':
				return <ComposeLockIcon {...{ colorScheme }} />;
			case 'direct':
				return <ComposeMentionIcon {...{ colorScheme }} />;
		}
	};

	return (
		<View>
			<View className={styles.container}>
				{/****** Media Upload Action ******/}
				<Pressable
					disabled={
						selectedMedia.length == 4 || isMediaUploading || !!composeState.poll
					}
					onPress={onToggleMediaModal}
					className={cn(
						'mr-3',
						(selectedMedia.length == 4 ||
							isMediaUploading ||
							!!composeState.poll) &&
							'opacity-30',
					)}
					children={<ComposeGalleryIcon {...{ colorScheme }} />}
				/>
				{/****** Media Upload Action ******/}

				<Pressable
					disabled
					className={'mr-3 opacity-30'}
					children={<ComposeGifIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3 opacity-30'}
					children={<ComposeLocationIcon {...{ colorScheme }} />}
				/>

				{/****** Poll Action ******/}
				<Pressable
					disabled={selectedMedia.length > 0}
					onPress={onPressPoll}
					className={cn('mr-3', selectedMedia.length > 0 && 'opacity-30')}
					children={
						<ComposePollIcon
							{...{ colorScheme }}
							stroke={composeState.poll ? '#FF3C26' : '#FFFFFF'}
						/>
					}
				/>
				{/****** Poll Action ******/}

				{/****** Visibility Settings Action ******/}
				<Pressable
					onPress={onToggleVisibilityModal}
					className={'mr-3'}
					children={getVisibilityIcon}
				/>
				{/****** Visibility Settings Action ******/}

				{/****** CTA Action ******/}
				<Pressable
					disabled={true}
					onPress={onToggleCTAModal}
					className={'mr-3 opacity-30'}
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
			{/* <PollModal
				visible={isPollModalVisible}
				onClose={() => setPollModalVisible(false)}
			/> */}
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
