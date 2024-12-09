import { queryClient } from '@/App';
import { Button } from '@/components/atoms/common/Button/Button';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ManageAttachmentModal from '@/components/organisms/compose/modal/ManageAttachment/MakeAttachmentModal';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useComposeMutation } from '@/hooks/mutations/feed.mutation';
import { useAuthStore } from '@/store/auth/authStore';
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
import { useSubchannelStatusActions } from '@/store/feed/subChannelStatusStore';
import { POLL_INITIAL } from '@/util/constant/pollOption';
import { prepareComposePayload } from '@/util/helper/compose';
import {
	ComposeGalleryIcon,
	ComposeGifIcon,
	ComposeLocationIcon,
	ComposePollIcon,
} from '@/util/svg/icon.compose';
import { delay, uniqueId } from 'lodash';
import { useColorScheme } from 'nativewind';
import { RefObject, useEffect } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import Toast from 'react-native-toast-message';

type Props = {
	feedDetailStatus: Pathchwork.Status;
	inputRef: RefObject<TextInput>;
	feedDetailId: string;
};

const ReplyActionBar = ({
	feedDetailStatus,
	inputRef,
	feedDetailId,
}: Props) => {
	const { colorScheme } = useColorScheme();
	const domain_name = useSelectedDomain();
	const { composeState, composeDispatch } = useComposeStatus();
	const { mediaModal, selectedMedia, progress } = useManageAttachmentStore();
	const { changeCurrentStatus } = useStatusReplyAction();
	const { currentFocusStatus } = useStatusReplyStore();
	const isMediaUploading = progress.currentIndex !== undefined;
	const { changeActiveFeedReplyCount } = useActiveFeedAction();
	const { userInfo } = useAuthStore();
	const { saveStatus } = useSubchannelStatusActions();

	const { onToggleMediaModal, resetAttachmentStore } =
		useManageAttachmentActions();

	const disabledMedia =
		selectedMedia.length == 4 || isMediaUploading || !!composeState.poll;

	const disabledPoll = selectedMedia.length > 0;

	const feedReplyQueryKey = ['feed-replies', { id: feedDetailId, domain_name }];

	const accountDetailFeedQueryKey = [
		'account-detail-feed',
		{
			domain_name: domain_name,
			account_id: userInfo?.id!,
			exclude_replies: true,
			exclude_reblogs: false,
			exclude_original_statuses: false,
		},
	];

	const accountDetailReplyFeedQueryKey = [
		'account-detail-feed',
		{
			domain_name: domain_name,
			account_id: userInfo?.id!,
			exclude_replies: false,
			exclude_reblogs: true,
			exclude_original_statuses: true,
		},
	];

	const channelFeedQueryKey = [
		'channel-feed',
		{ domain_name, remote: false, only_media: false },
	];

	useEffect(() => {
		if (composeState.in_reply_to_id === undefined) {
			composeDispatch({
				type: 'reply_id_change',
				payload: feedDetailStatus.id,
			});
			changeCurrentStatus(feedDetailStatus);
		}
	}, [composeState]);
	const { mutate, isPending } = useComposeMutation({
		onSuccess: (newStatus: Pathchwork.Status) => {
			composeDispatch({ type: 'clear' });
			resetAttachmentStore();

			currentFocusStatus?.id == feedDetailId &&
				changeActiveFeedReplyCount('increase');

			retryReplyQueryUpToThreeTimes(feedReplyQueryKey);
			queryClient.invalidateQueries({ queryKey: accountDetailFeedQueryKey });
			queryClient.invalidateQueries({
				queryKey: accountDetailReplyFeedQueryKey,
			});
			queryClient.invalidateQueries({ queryKey: channelFeedQueryKey });
		},
		onError: e => {
			Toast.show({
				type: 'errorToast',
				text1: e.message,
				position: 'top',
				topOffset: 50,
			});
		},
	});

	//temp
	const retryReplyQueryUpToThreeTimes = async (
		queryKey: typeof feedReplyQueryKey,
		retries = 3,
	) => {
		let attempts = 0;
		const fetchAndCheck = async () => {
			await queryClient.invalidateQueries({ queryKey });
			const previousData = queryClient.getQueryData(queryKey);
			await queryClient.refetchQueries({ queryKey });
			const currentData = queryClient.getQueryData(queryKey);
			if (JSON.stringify(previousData) !== JSON.stringify(currentData)) {
				return true;
			}
			attempts++;
			if (attempts < retries) {
				const delayTime = attempts === 1 ? 300 : 600;
				delay(fetchAndCheck, delayTime);
			}
		};
		await fetchAndCheck();
	};

	const handlePublish = () => {
		if (
			composeState.text.count < composeState.maxCount ||
			composeState.in_reply_to_id !== undefined
		) {
			const payload = prepareComposePayload(composeState);
			const selectedStatus = currentFocusStatus ?? feedDetailStatus;
			const crossChannelRequestIdentifier = uniqueId(
				`CROS-Channel-Status::${selectedStatus.id}::Req-ID::`,
			);
			saveStatus(crossChannelRequestIdentifier, {
				status: selectedStatus,
				savedPayload: payload,
				specificPayloadMapping: { in_reply_to_id: 'id' },
				crossChannelRequestIdentifier,
			});
			mutate({ ...payload, crossChannelRequestIdentifier });
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

	const getStrokeColorForPoll = () => {
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
						<ComposePollIcon
							{...{ colorScheme }}
							stroke={getStrokeColorForPoll()}
						/>
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
