import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useRepostMutation } from '@/hooks/mutations/feed.mutation';
import { useManageAttachmentActions } from '@/store/compose/manageAttachments/manageAttachmentStore';
import { useSubchannelStatusActions } from '@/store/feed/subChannelStatusStore';
import { BottomStackParamList } from '@/types/navigation';
import { prepareRepostPayload } from '@/util/helper/compose';
import { cn } from '@/util/helper/twutil';
import { ComposeRepostSendIcon } from '@/util/svg/icon.compose';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { uniqueId } from 'lodash';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
	status: Pathchwork.Status;
	extraClass?: string;
};

const ComposeRepostButton = ({ extraClass, status }: Props) => {
	const { colorScheme } = useColorScheme();
	const { composeState, composeDispatch } = useComposeStatus();
	const navigation = useNavigation<StackNavigationProp<BottomStackParamList>>();
	const { saveStatus } = useSubchannelStatusActions();

	const { resetAttachmentStore } = useManageAttachmentActions();

	const { mutate, isPending } = useRepostMutation({
		onSuccess: (response: Pathchwork.Status) => {
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
