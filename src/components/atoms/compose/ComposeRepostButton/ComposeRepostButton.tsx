import { queryClient } from '@/App';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { StatusCurrentPage } from '@/context/statusItemContext/statusItemContext.type';
import { useRepostMutation } from '@/hooks/mutations/feed.mutation';
import { useAuthStore } from '@/store/auth/authStore';
import {
	useManageAttachmentActions,
	useManageAttachmentStore,
} from '@/store/compose/manageAttachments/manageAttachmentStore';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import { useSubchannelStatusActions } from '@/store/feed/subChannelStatusStore';
import { BottomStackParamList } from '@/types/navigation';
import {
	StatusCacheQueryKeys,
	getCacheQueryKeys,
} from '@/util/cache/queryCacheHelper';
import {
	applyReblogCountCacheUpdates,
	incrementReblogsCount,
	updateReblogsCountForHashtag,
} from '@/util/cache/reblog/reblogCache';
import { POLL_LIMITS } from '@/util/constant/pollOption';
import { prepareRepostPayload } from '@/util/helper/compose';
import { cn } from '@/util/helper/twutil';
import { ComposeRepostSendIcon } from '@/util/svg/icon.compose';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { uniqueId } from 'lodash';
import { useColorScheme } from 'nativewind';
import { useMemo } from 'react';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
	status: Pathchwork.Status;
	extraClass?: string;
	statusCurrentPage?: StatusCurrentPage;
	otherUserId: Pathchwork.Account['id'];
	extraPayload?: Record<string, any>;
};

const ComposeRepostButton = ({
	extraClass,
	status,
	statusCurrentPage,
	otherUserId,
	extraPayload,
}: Props) => {
	const { colorScheme } = useColorScheme();
	const { composeState, composeDispatch } = useComposeStatus();
	const navigation = useNavigation<StackNavigationProp<BottomStackParamList>>();
	const { saveStatus } = useSubchannelStatusActions();

	const domain_name = useSelectedDomain();
	const { userInfo } = useAuthStore();

	const isNotMyId = useMemo(() => {
		return userInfo?.id !== otherUserId;
	}, [otherUserId]);

	const currentFeed = useCurrentActiveFeed();
	const { setActiveFeed } = useActiveFeedAction();

	const { resetAttachmentStore } = useManageAttachmentActions();
	const { progress } = useManageAttachmentStore();
	const isMediaUploading = progress.currentIndex !== undefined;

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

	const { mutate, isPending } = useRepostMutation({
		onMutate: ({ id: statusId }) => {
			if (statusCurrentPage == 'FeedDetail' && currentFeed?.id === statusId) {
				const updateFeedDatailData = incrementReblogsCount(currentFeed);
				setActiveFeed(updateFeedDatailData);
			}
		},
		onSuccess: (status: Pathchwork.Status) => {
			const queryKeys = getCacheQueryKeys<StatusCacheQueryKeys>(
				isNotMyId ? otherUserId : status.account.id,
				status.reblog?.in_reply_to_id,
				status.reblog?.in_reply_to_account_id,
				status.reblog ? true : false,
				domain_name,
			);
			applyReblogCountCacheUpdates({ response: status, queryKeys });
			statusCurrentPage == 'Hashtag' &&
				updateReblogsCountForHashtag(extraPayload, status);

			queryClient.invalidateQueries({ queryKey: accountDetailFeedQueryKey });
			console.log('statusCurrentPage::', statusCurrentPage, extraPayload);

			Toast.show({
				type: 'successToast',
				text1: 'Reposted Successfully',
				position: 'top',
				topOffset: 50,
			});

			navigation.goBack();
			resetAttachmentStore();
			composeDispatch({ type: 'clear' });
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

	const handleRepostStatus = () => {
		if (composeState.text.count <= composeState.maxCount) {
			const payload = prepareRepostPayload(composeState, status.id);
			const crossChannelRequestIdentifier = uniqueId(
				`CROS-Channel-Status::${status.id}::Req-ID::`,
			);
			saveStatus(crossChannelRequestIdentifier, {
				status: status,
				savedPayload: payload,
				specificPayloadMapping: { in_reply_to_id: 'id' },
				crossChannelRequestIdentifier,
			});
			mutate({ ...payload, crossChannelRequestIdentifier });
		}
	};

	const disabledComposeRepostButton = () => {
		const { text, poll, maxCount } = composeState;
		const hasEmptyPollOptions = poll?.options?.some(
			option => option.trim() === '',
		);
		const insufficientPollOptions =
			poll && poll.options?.length < POLL_LIMITS.MIN_OPTIONS;

		return (
			isPending ||
			isMediaUploading ||
			insufficientPollOptions ||
			hasEmptyPollOptions ||
			text.count > maxCount
		);
	};

	return (
		<Pressable
			onPress={handleRepostStatus}
			disabled={disabledComposeRepostButton()}
			className={cn(
				`${
					disabledComposeRepostButton() && 'opacity-40'
				} w-10 h-10 items-center justify-center rounded-full border-[1px] border-patchwork-grey-100`,
				extraClass,
			)}
		>
			<ComposeRepostSendIcon colorScheme={colorScheme} />
		</Pressable>
	);
};

export default ComposeRepostButton;
