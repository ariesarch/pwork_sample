import customColor from '@/util/constant/color';
import TextInput from '../../common/TextInput/TextInput';
import { useState } from 'react';
import {
	runOnJS,
	SharedValue,
	useAnimatedReaction,
} from 'react-native-reanimated';

type Props = {
	username: string;
	progress: SharedValue<number>;
};

const FeedReplyTextInput = ({ username, progress }: Props) => {
	const [replyMsg, setReply] = useState('');
	const [isKeyboardOpen, setKeyboardOpen] = useState(false);

	useAnimatedReaction(
		() => progress.value,
		currentVal => {
			if (currentVal > 0.7) {
				return runOnJS(setKeyboardOpen)(true);
			} else {
				return runOnJS(setKeyboardOpen)(false);
			}
		},
	);

	return (
		<>
			<TextInput
				selectionColor={customColor['patchwork-red-50']}
				value={replyMsg}
				placeholder={
					isKeyboardOpen ? 'Type your reply' : `Reply To ${username}`
				}
				onChangeText={setReply}
			/>
		</>
	);
};

export default FeedReplyTextInput;
