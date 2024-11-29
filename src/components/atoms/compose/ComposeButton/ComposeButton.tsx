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

const ComposeButton = () => {
	const { composeState, composeDispatch } = useComposeStatus();
	const navigation = useNavigation<StackNavigationProp<BottomStackParamList>>();

	const { mutate, isPending } = useComposeMutation({
		onSuccess: (response: Pathchwork.Status) => {
			Toast.show({
				type: 'successToast',
				text1: 'Created Successfully',
				position: 'top',
				topOffset: 50,
			});
			navigation.navigate('HomeFeed');
			composeDispatch({ type: 'clear' });
		},
		onError: e => {
			Toast.show({
				type: 'errorToast',
				text1: 'Something went wrong',
				position: 'top',
				topOffset: 50,
			});
		},
	});

	const handleComposeStatus = () => {
		if (composeState.text.count < composeState.maxCount) {
			const payload = prepareComposePayload(composeState);
			mutate(payload);
		}
	};

	const disabledComposeButton = () => {
		const { text, poll } = composeState;
		const hasEmptyPollOptions = poll?.options?.some(
			option => option.trim() === '',
		);
		const insufficientPollOptions =
			poll && poll.options?.length < POLL_LIMITS.MIN_OPTIONS;

		return (
			isPending || !text.raw || insufficientPollOptions || hasEmptyPollOptions
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
