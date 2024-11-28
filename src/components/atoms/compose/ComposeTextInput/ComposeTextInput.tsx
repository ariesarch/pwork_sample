import { TextInput, TextInputProps } from 'react-native';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { FormattedText } from '../FormattedText/FormattedText';

const ComposeTextInput = ({ ...textInputProps }: TextInputProps) => {
	const inputColor = useAppropiateColorHash('patchwork-light-900');
	const selectionColor = useAppropiateColorHash('patchwork-red-50');
	const { composeState, composeDispatch } = useComposeStatus();

	return (
		<TextInput
			placeholder="Start Typing here.."
			multiline
			maxLength={composeState.maxCount}
			placeholderTextColor={inputColor}
			scrollEnabled={false}
			selectionColor={selectionColor}
			onChangeText={text => {
				composeDispatch({
					type: 'text',
					payload: {
						count: text.length,
						raw: text,
					},
				});
			}}
			autoCorrect
			autoComplete="off"
			autoFocus
			autoCapitalize="none"
			spellCheck
			{...textInputProps}
			className="text-white font-SourceSans3_Regular text-base opacity-80 p-3"
		>
			<FormattedText text={composeState.text.raw} />
		</TextInput>
	);
};

export default ComposeTextInput;
