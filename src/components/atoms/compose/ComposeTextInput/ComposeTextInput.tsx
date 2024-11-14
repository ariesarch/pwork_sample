import { TextInput, TextInputProps } from 'react-native';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';

const ComposeTextInput = ({ ...textInputProps }: TextInputProps) => {
	const inputColor = useAppropiateColorHash('patchwork-light-900');
	const selectionColor = useAppropiateColorHash('patchwork-red-50');

	return (
		<TextInput
			placeholder="Start Typing here.."
			multiline
			maxLength={4000}
			placeholderTextColor={inputColor}
			scrollEnabled={false}
			selectionColor={selectionColor}
			autoCorrect
			autoComplete="off"
			autoFocus
			spellCheck
			{...textInputProps}
			className="text-white font-SourceSans3_Regular text-base opacity-80"
		/>
	);
};

export default ComposeTextInput;
