import { TextInput, TextInputProps, View } from 'react-native';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { FormattedText } from '../FormattedText/FormattedText';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';

const ComposeTextInput = ({ ...textInputProps }: TextInputProps) => {
	const inputColor = useAppropiateColorHash('patchwork-light-900');
	const selectionColor = useAppropiateColorHash('patchwork-red-50');
	const { composeState, composeDispatch } = useComposeStatus();
	const inputRef = useRef<TextInput>(null);

	const handleChangeText = (text: string) => {
		composeDispatch({
			type: 'text',
			payload: { count: text.length, raw: text },
		});

		if (composeState.disableUserSuggestionsModal) {
			composeDispatch({
				type: 'disableUserSuggestionsModal',
				payload: false,
			});
		}
	};

	useFocusEffect(
		useCallback(() => {
			// Focus the input when the screen is focused
			inputRef.current?.focus();
			inputRef.current?.clear();
		}, []),
	);

	return (
		<TextInput
			placeholder="Start Typing here.."
			ref={inputRef}
			multiline
			maxLength={composeState.maxCount}
			placeholderTextColor={inputColor}
			selectionColor={selectionColor}
			onChangeText={handleChangeText}
			autoFocus
			autoCapitalize="none"
			spellCheck
			{...textInputProps}
			className="text-white font-SourceSans3_Regular text-base opacity-80 py-3 px-2"
		>
			<FormattedText text={composeState.text.raw} />
		</TextInput>
	);
};

export default ComposeTextInput;
