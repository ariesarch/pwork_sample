import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import {
	safeUseComposeStatus,
	useComposeStatus,
} from '@/context/composeStatusContext/composeStatus.context';
import {
	useStatusReplyAction,
	useStatusReplyStore,
} from '@/store/compose/statusReply/statusReplyStore';
import { useActiveFeedAction } from '@/store/feed/activeFeed';
import { HomeStackParamList } from '@/types/navigation';
import customColor from '@/util/constant/color';
import { cn } from '@/util/helper/twutil';
import { Reply } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable, ViewProps } from 'react-native';

type Props = {
	count: number;
	status: Pathchwork.Status;
	isFeedDetail?: boolean;
} & ViewProps;

const StatusReplyButton = ({
	count,
	isFeedDetail,
	status,
	...props
}: Props) => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const { textInputRef, currentFocusStatus } = useStatusReplyStore();
	const { setActiveFeed } = useActiveFeedAction();
	const composeStatus = safeUseComposeStatus();
	const { changeCurrentStatus } = useStatusReplyAction();

	const handlePress = () => {
		if (!isFeedDetail) {
			setActiveFeed(status.reblog ? status.reblog : status);
			return navigation.navigate('FeedDetail', {
				id: status.reblog ? status.reblog.id : status.id,
				openKeyboardAtMount: true,
			});
		}
		openKeyboardAndChangeReplyId();
	};

	const openKeyboardAndChangeReplyId = () => {
		composeStatus &&
			composeStatus.composeDispatch({
				type: 'reply_id_change',
				payload: status.id,
			});
		changeCurrentStatus(status);
		return textInputRef?.current?.focus();
	};

	return (
		<Pressable
			className={cn('flex flex-row items-center gap-1 active:opacity-80')}
			onPress={handlePress}
			{...props}
		>
			<Reply
				stroke={
					currentFocusStatus &&
					!!isFeedDetail &&
					currentFocusStatus.id == status.id
						? customColor['patchwork-grey-50']
						: '#828689'
				}
			/>
			<ThemeText variant="textGrey">{count}</ThemeText>
		</Pressable>
	);
};

export default StatusReplyButton;
