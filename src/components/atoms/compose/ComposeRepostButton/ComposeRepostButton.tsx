import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import {
	useComposeMutation,
	useRepostMutation,
} from '@/hooks/mutations/feed.mutation';
import { BottomStackParamList } from '@/types/navigation';
import { prepareRepostPayload } from '@/util/helper/compose';
import { cn } from '@/util/helper/twutil';
import { ComposeRepostSendIcon } from '@/util/svg/icon.compose';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
	id: string;
	extraClass?: string;
};

const ComposeRepostButton = ({ extraClass, id }: Props) => {
	const { colorScheme } = useColorScheme();
	const { composeState, composeDispatch } = useComposeStatus();
	const navigation = useNavigation<StackNavigationProp<BottomStackParamList>>();

	const { mutate, isPending } = useRepostMutation({
		onSuccess: (response: Pathchwork.Status) => {
			Toast.show({
				type: 'successToast',
				text1: 'Reposted Successfully',
				position: 'top',
				topOffset: 50,
			});
			navigation.goBack();
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

	const handleRepostStatus = () => {
		if (composeState.text.count <= composeState.maxCount) {
			const payload = prepareRepostPayload(composeState, id);
			mutate(payload);
		}
	};

	return (
		<Pressable
			onPress={handleRepostStatus}
			className={cn(
				'w-10 h-10 items-center justify-center rounded-full border-[1px] border-patchwork-grey-100',
				extraClass,
			)}
		>
			<ComposeRepostSendIcon colorScheme={colorScheme} />
		</Pressable>
	);
};

export default ComposeRepostButton;
