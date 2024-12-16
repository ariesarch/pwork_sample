import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useComposeMutation } from '@/hooks/mutations/feed.mutation';
import { ConversationsStackParamList } from '@/types/navigation';
import { prepareComposePayload } from '@/util/helper/compose';
import { removeOtherMentions } from '@/util/helper/removeOtherMentions';
import { cn } from '@/util/helper/twutil';
import { SendIcon } from '@/util/svg/icon.conversations';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useColorScheme } from 'nativewind';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

type Props = {
	extraClass?: string;
	disabled?: boolean;
};
const SendButton = ({ extraClass, disabled }: Props) => {
	const navigation =
		useNavigation<StackNavigationProp<ConversationsStackParamList>>();
	const { colorScheme } = useColorScheme();
	const { composeState, composeDispatch } = useComposeStatus();

	const { mutate, isPending } = useComposeMutation({
		onSuccess: (response: Pathchwork.Status) => {
			navigation.navigate('ConversationDetail', {
				id: response.id,
				isNewMessage: true,
			});
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
	const handleSend = () => {
		if (composeState.text.count <= composeState.maxCount) {
			let payload;
			payload = prepareComposePayload(composeState);
			payload.visibility = 'direct';
			payload.status = removeOtherMentions(payload.status);
			mutate(payload);
		}
	};

	return (
		<TouchableOpacity
			onPress={handleSend}
			disabled={disabled}
			className={cn(
				'w-10 h-10 items-center justify-center rounded-full border-[1px] border-patchwork-grey-100',
				extraClass,
			)}
		>
			<SendIcon colorScheme={colorScheme} />
		</TouchableOpacity>
	);
};

export default SendButton;
