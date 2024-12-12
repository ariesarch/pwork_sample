import TextInput from '../../common/TextInput/TextInput';
import { useEffect, useRef, useState } from 'react';
import {
	runOnJS,
	SharedValue,
	useAnimatedReaction,
} from 'react-native-reanimated';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { FormattedText } from '../FormattedText/FormattedText';
import {
	useStatusReplyAction,
	useStatusReplyStore,
} from '@/store/compose/statusReply/statusReplyStore';
import { TextInput as RNTextInput } from 'react-native';

type ReplyInputProps = {
	username: string;
	progress: SharedValue<number>;
	autoFocus: boolean;
};

const FeedReplyTextInput = ({
	username,
	progress,
	autoFocus,
}: ReplyInputProps) => {
	const [isKeyboardOpen, setKeyboardOpen] = useState(false);
	const { composeState, composeDispatch } = useComposeStatus();
	const { currentFocusStatus } = useStatusReplyStore();
	const { setTextInputRef } = useStatusReplyAction();
	const inputRef = useRef<RNTextInput>(null);

	useEffect(() => {
		setTextInputRef(inputRef);
	}, [setTextInputRef]);

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
					isKeyboardOpen
						? 'Type your reply'
						: `Reply To ${currentFocusStatus?.account.acct}`
				}
				ref={inputRef}
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
				autoFocus={autoFocus}
				autoCapitalize="none"
				spellCheck
				className="text-white leading-6 font-SourceSans3_Regular opacity-80"
			>
				<FormattedText text={composeState.text.raw} />
			</TextInput>
		</>
	);
};
export default FeedReplyTextInput;
