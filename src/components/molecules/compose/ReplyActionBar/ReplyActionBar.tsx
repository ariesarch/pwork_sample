import { queryClient } from '@/App';
import { Button } from '@/components/atoms/common/Button/Button';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ManageAttachmentModal from '@/components/organisms/compose/modal/ManageAttachment/MakeAttachmentModal';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useComposeMutation } from '@/hooks/mutations/feed.mutation';
import {
	useManageAttachmentActions,
	useManageAttachmentStore,
} from '@/store/compose/manageAttachments/manageAttachmentStore';
import {
	useStatusReplyAction,
	useStatusReplyStore,
} from '@/store/compose/statusReply/statusReplyStore';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { useActiveFeedAction } from '@/store/feed/activeFeed';
import { POLL_INITIAL } from '@/util/constant/pollOption';
import {
	prepareComposePayload,
	prepareReplyPayload,
} from '@/util/helper/compose';
import { mediaUploadAction } from '@/util/helper/mediaUploadActions';
import { hasMediaPermissions } from '@/util/helper/permission';
import {
	ComposeGalleryIcon,
	ComposeGifIcon,
	ComposeLocationIcon,
	ComposePollIcon,
} from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';
import { Ref, RefObject, useEffect } from 'react';
import { Keyboard, Platform, Pressable, TextInput, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

type Props = {
	currentStatus: Pathchwork.Status;
	inputRef: RefObject<TextInput>;
	feedDetailId: string;
};

const ReplyActionBar = ({ currentStatus, inputRef, feedDetailId }: Props) => {
	const { colorScheme } = useColorScheme();
	const domain_name = useSelectedDomain();
	const { composeState, composeDispatch } = useComposeStatus();
	const { mediaModal, selectedMedia, progress } = useManageAttachmentStore();
	const { changeCurrentStatus } = useStatusReplyAction();
	const { currentFocusStatus } = useStatusReplyStore();
	const isMediaUploading = progress.currentIndex !== undefined;
	const { changeActiveFeedReplyCount } = useActiveFeedAction();
	const feedReplyQueryKey = ['feed-replies', { id: feedDetailId, domain_name }];

	const { onToggleMediaModal, resetAttachmentStore } =
		useManageAttachmentActions();

	const disabledMedia =
		selectedMedia.length == 4 || isMediaUploading || !!composeState.poll;

	const disabledPoll = selectedMedia.length > 0;

	useEffect(() => {
		if (composeState.in_reply_to_id === undefined) {
			composeDispatch({ type: 'reply_id_change', payload: currentStatus.id });
			changeCurrentStatus(currentStatus);
		}
	}, [composeState]);

	const { mutate, isPending } = useComposeMutation({
		onSuccess: (response: Pathchwork.Status) => {
			queryClient.invalidateQueries({ queryKey: feedReplyQueryKey });
			composeDispatch({ type: 'clear' });
			resetAttachmentStore();
			currentFocusStatus?.id == feedDetailId &&
				changeActiveFeedReplyCount('increase');
		},
		onError: e => {
			Toast.show({
				type: 'errorToast',
				text1: 'Currently, reply is only available for main channel.',
				position: 'top',
				topOffset: 50,
			});
		},
	});

	const handlePublish = () => {
		if (
			composeState.text.count < composeState.maxCount ||
			composeState.in_reply_to_id !== undefined
		) {
			const payload = prepareComposePayload(composeState);
			mutate(payload);
		}
	};

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

	const getStrokeColor = () => {
		if (disabledPoll) return '#6D7276';
		if (composeState.poll) return '#FF3C26';
		return '#FFFFFF';
	};

	return (
		<View className="flex-row items-center pt-2">
			<View className="flex-row flex-1">
				<Pressable
					className={'mr-3'}
					disabled={disabledMedia}
					onPress={() => {
						// Keyboard.dismiss();
						onToggleMediaModal();
					}}
					children={
						<ComposeGalleryIcon
							{...{ colorScheme }}
							stroke={disabledMedia ? '#6D7276' : '#fff'}
						/>
					}
				/>
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
				<Pressable
					disabled={disabledPoll}
					onPress={onPressPoll}
					className={'mr-3'}
					children={
						<ComposePollIcon {...{ colorScheme }} stroke={getStrokeColor()} />
					}
				/>
			</View>
			<Button
				variant="outline"
				disabled={composeState.text.count == 0 || isPending}
				onPress={handlePublish}
				className="rounded-2xl h-7"
				size="sm"
			>
				{isPending ? (
					<Flow size={20} color={'#fff'} className="my-2" />
				) : (
					<ThemeText className="m-0" size="xs_12">
						Publish
					</ThemeText>
				)}
			</Button>
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
		</View>
	);
};

export default ReplyActionBar;
