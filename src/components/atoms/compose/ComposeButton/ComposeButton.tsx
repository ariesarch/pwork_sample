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
import { useManageAttachmentActions } from '@/store/compose/manageAttachments/manageAttachmentStore';

const ComposeButton = ({ statusId }: { statusId: string }) => {
	const { composeState, composeDispatch } = useComposeStatus();
	const navigation = useNavigation<StackNavigationProp<BottomStackParamList>>();

	const currentFeed = useCurrentActiveFeed();
	const { setActiveFeed } = useActiveFeedAction();
	const { resetAttachmentStore } = useManageAttachmentActions();

	const { mutate, isPending } = useComposeMutation({
		onSuccess: (status: Pathchwork.Status) => {
			if (currentFeed) {
				setActiveFeed(status);
			}

			const queryKeys = getCacheQueryKeys<StatusCacheQueryKeys>(
				status.account.id,
				status.in_reply_to_id,
			);

			if (statusId) {
				editedStatusCacheData({
					status_id: status.id,
					updatedStatus: status,
					queryKeys,
				});
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
			insufficientPollOptions ||
			hasEmptyPollOptions ||
			text.count >= maxCount
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
