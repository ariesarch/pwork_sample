import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useRepostMutation } from '@/hooks/mutations/feed.mutation';
import { useAuthStore } from '@/store/auth/authStore';
import {
	useManageAttachmentActions,
	useManageAttachmentStore,
} from '@/store/compose/manageAttachments/manageAttachmentStore';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import { BottomStackParamList } from '@/types/navigation';
import {
	StatusCacheQueryKeys,
	getCacheQueryKeys,
} from '@/util/cache/queryCacheHelper';
import {
	applyReblogCountCacheUpdates,
	incrementReblogsCount,
} from '@/util/cache/reblog/reblogCache';
import { createStatusAndCache } from '@/util/cache/statusActions/editStatusCache';
import { POLL_LIMITS } from '@/util/constant/pollOption';
import { prepareRepostPayload } from '@/util/helper/compose';
import { cn } from '@/util/helper/twutil';
import { ComposeRepostSendIcon } from '@/util/svg/icon.compose';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useColorScheme } from 'nativewind';
import { useMemo } from 'react';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
	id: string;
	extraClass?: string;
	isFeedDetail?: boolean;
	otherUserId: Pathchwork.Account['id'];
};

const ComposeRepostButton = ({
	extraClass,
	id,
	isFeedDetail,
	otherUserId,
}: Props) => {
	const { colorScheme } = useColorScheme();
	const { composeState, composeDispatch } = useComposeStatus();
	const navigation = useNavigation<StackNavigationProp<BottomStackParamList>>();

	const { userInfo } = useAuthStore();

	const isNotMyId = useMemo(() => {
		return userInfo?.id !== otherUserId;
	}, [otherUserId]);

	const currentFeed = useCurrentActiveFeed();
	const { setActiveFeed } = useActiveFeedAction();

	const { resetAttachmentStore } = useManageAttachmentActions();
	const { progress } = useManageAttachmentStore();
	const isMediaUploading = progress.currentIndex !== undefined;

	const { mutate, isPending } = useRepostMutation({
		onMutate: ({ id: statusId }) => {
			if (isFeedDetail && currentFeed?.id === statusId) {
				const updateFeedDatailData = incrementReblogsCount(currentFeed);
				setActiveFeed(updateFeedDatailData);
			}
		},
		onSuccess: (status: Pathchwork.Status) => {
			const queryKeys = getCacheQueryKeys<StatusCacheQueryKeys>(
				isNotMyId ? otherUserId : status.account.id,
				status.reblog?.in_reply_to_id,
			);
			applyReblogCountCacheUpdates({ response: status, queryKeys });

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
				text1: 'Currently, reposting is available only for main channel',
				position: 'top',
				topOffset: 50,
			});
		},
	});

	const handleRepostStatus = () => {
		if (composeState.text.count <= composeState.maxCount) {
			const payload = prepareRepostPayload(composeState, id);
			mutate(payload);
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
