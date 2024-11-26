import { Pressable } from 'react-native';
import ComposeRepostButton from '../ComposeRepostButton/ComposeRepostButton';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useComposeMutation } from '@/hooks/mutations/feed.mutation';
import { prepareComposePayload } from '@/util/helper/compose';
import { Flow } from 'react-native-animated-spinkit';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { BottomStackParamList, TabBarScreenProps } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

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

	return (
		<Pressable
			className="border-[1] border-[1px] border-patchwork-grey-100 py-[6] px-3 rounded-full"
			disabled={isPending}
			onPress={handleComposeStatus}
		>
			{isPending ? (
				<Flow size={20} color={'#fff'} className="my-2" />
			) : (
				<ThemeText size={'fs_13'} className="leading-5">
					Post
				</ThemeText>
			)}
		</Pressable>
	);
};

export default ComposeButton;
