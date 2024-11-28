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
import { POLL_INITIAL } from '@/util/constant/pollOption';

const ComposeActionsBar = () => {
	const { composeState, composeDispatch } = useComposeStatus();
	const { colorScheme } = useColorScheme();

	const [isLongPost, setLongPost] = useState(false);

	// ****** Media Store ****** //
	const mediaModal = useManageAttachmentStore(state => state.mediaModal);
	const { onToggleMediaModal } = useManageAttachmentActions();
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

	return (
		<View>
			<View className={styles.container}>
				{/****** Media Upload Action ******/}
				<Pressable
					disabled={composeState.poll ? true : false}
					onPress={onToggleMediaModal}
					className={'mr-3'}
					children={
						<ComposeGalleryIcon
							{...{ colorScheme }}
							stroke={composeState.poll ? '#6D7276' : '#FFFFFF'}
						/>
					}
				/>
				{/****** Media Upload Action ******/}

				<Pressable
					disabled
					className={'mr-3'}
					children={<ComposeGifIcon {...{ colorScheme }} stroke={'#6D7276'} />}
				/>
				<Pressable
					className={'mr-3'}
					children={
						<ComposeLocationIcon {...{ colorScheme }} stroke={'#6D7276'} />
					}
				/>

				{/****** Poll Action ******/}
				<Pressable
					onPress={onPressPoll}
					className={'mr-3'}
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
				<View className="flex-1 items-end">
					<View className="flex-row items-center">
						{!isLongPost && <ComposePlusIcon />}
						<Pressable onPress={() => setLongPost(true)}>
							<ThemeText className="ml-2 text-white">
								{isLongPost ? '4000' : 'Long Post'}
							</ThemeText>
						</Pressable>
					</View>
				</View>
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
