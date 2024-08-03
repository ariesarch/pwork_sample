import React, { useContext } from 'react';
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
			autoCorrect={true}
			autoComplete={'off'}
			autoFocus
			spellCheck={true}
			{...textInputProps}
			className="text-white"
		/>
	);
};

export default ComposeTextInput;
