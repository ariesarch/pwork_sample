import { Pressable } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useComposeMutation } from '@/hooks/mutations/feed.mutation';
import { prepareComposePayload } from '@/util/helper/compose';
import { Flow } from 'react-native-animated-spinkit';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { BottomStackParamList } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { POLL_LIMITS } from '@/util/constant/pollOption';
import {
	StatusCacheQueryKeys,
	getCacheQueryKeys,
} from '@/util/cache/queryCacheHelper';
import {
	createStatusAndCache,
	editedStatusCacheData,
} from '@/util/cache/statusActions/editStatusCache';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import {
	useManageAttachmentActions,
	useManageAttachmentStore,
} from '@/store/compose/manageAttachments/manageAttachmentStore';
import { queryClient } from '@/App';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { useAuthStore } from '@/store/auth/authStore';
import { StatusCurrentPage } from '@/context/statusItemContext/statusItemContext.type';

const ComposeButton = ({
	statusId,
	statusCurrentPage,
}: {
	statusId: string;
	statusCurrentPage?: StatusCurrentPage;
}) => {
	const { composeState, composeDispatch } = useComposeStatus();
	const navigation = useNavigation<StackNavigationProp<BottomStackParamList>>();
	const domain_name = useSelectedDomain();
	const { userInfo } = useAuthStore();

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

	const channelFeedQueryKey = [
		'channel-feed',
		{ domain_name, remote: false, only_media: false },
	];

	const { mutate, isPending } = useComposeMutation({
		onSuccess: (status: Patchwork.Status) => {
			if (statusCurrentPage == 'FeedDetail' && currentFeed?.id === status.id) {
				setActiveFeed(status);
			}

			if (statusId) {
				const queryKeys = getCacheQueryKeys<StatusCacheQueryKeys>(
					status.account.id,
					status.in_reply_to_id,
					status.in_reply_to_account_id,
					status.reblog ? true : false,
					domain_name,
				);
				editedStatusCacheData({
					status_id: status.id,
					updatedStatus: status,
					queryKeys,
				});
			} else {
				queryClient.invalidateQueries({ queryKey: accountDetailFeedQueryKey });
				queryClient.invalidateQueries({ queryKey: channelFeedQueryKey });
			}

			Toast.show({
				type: 'successToast',
				text1: `${statusId ? 'Updated' : 'Created'} Successfully`,
				position: 'top',
				topOffset: 50,
			});
			// navigation.navigate('HomeFeed');
			composeDispatch({ type: 'clear' });
			resetAttachmentStore();
			navigation.goBack();
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

	const handleComposeStatus = () => {
		if (composeState.text.count <= composeState.maxCount) {
			const payload = prepareComposePayload(composeState);
			statusId ? mutate({ statusId, ...payload }) : mutate(payload);
		}
	};

	const disabledComposeButton = () => {
		const { text, poll, maxCount } = composeState;
		const hasEmptyPollOptions = poll?.options?.some(
			option => option.trim() === '',
		);
		const insufficientPollOptions =
			poll && poll.options?.length < POLL_LIMITS.MIN_OPTIONS;

		return (
			isPending ||
			!text.raw ||
			isMediaUploading ||
			insufficientPollOptions ||
			hasEmptyPollOptions ||
			text.count > maxCount
		);
	};

	return (
		<Pressable
			className="border-[1] border-[1px] border-patchwork-grey-100 py-[6] px-3 rounded-full"
			disabled={disabledComposeButton()}
			onPress={handleComposeStatus}
		>
			{isPending ? (
				<Flow size={20} color={'#fff'} className="my-2" />
			) : (
				<ThemeText
					size={'fs_13'}
					className={`${disabledComposeButton() && 'opacity-40'} leading-5`}
				>
					Post
				</ThemeText>
			)}
		</Pressable>
	);
};

export default ComposeButton;
