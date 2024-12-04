import { ScrollView } from 'react-native';
import PollForm from '../PollForm/PollForm';
import { ComposeType } from '@/context/composeStatusContext/composeStatus.type';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { cn } from '@/util/helper/twutil';

const ReplyPollForm = () => {
	const { composeState } = useComposeStatus();

	return (
		<ScrollView
			className={cn(
				'max-h-[200] mb-4 rounded-lg',
				composeState.poll && 'border border-patchwork-dark-50',
			)}
			showsVerticalScrollIndicator={false}
			keyboardShouldPersistTaps="always"
		>
			<PollForm composeType="reply" />
		</ScrollView>
	);
};
export default ReplyPollForm;
