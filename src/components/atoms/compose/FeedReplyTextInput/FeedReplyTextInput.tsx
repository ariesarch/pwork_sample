import customColor from '@/util/constant/color';
import TextInput from '../../common/TextInput/TextInput';
import { useState } from 'react';
import {
	runOnJS,
	SharedValue,
	useAnimatedReaction,
} from 'react-native-reanimated';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { FormattedText } from '../FormattedText/FormattedText';

type Props = {
	username: string;
	progress: SharedValue<number>;
};

const FeedReplyTextInput = ({ username, progress }: Props) => {
	const [replyMsg, setReply] = useState('');
	const [isKeyboardOpen, setKeyboardOpen] = useState(false);
	const { composeState, composeDispatch } = useComposeStatus();

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
				placeholder={
					isKeyboardOpen ? 'Type your reply' : `Reply To ${username}`
				}
				multiline
				maxLength={4000}
				onChangeText={text => {
					composeDispatch({
						type: 'text',
						payload: {
							count: text.length,
							raw: text,
						},
					});
				}}
				autoCapitalize="none"
				spellCheck
				className="text-white font-SourceSans3_Regular text-base opacity-80"
			>
				<FormattedText text={composeState.text.raw} />
			</TextInput>
		</>
	);
};

export default FeedReplyTextInput;
