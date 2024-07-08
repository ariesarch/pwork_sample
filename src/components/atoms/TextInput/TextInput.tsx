import React from 'react';
import {
	View,
	TextInputProps,
	TextInput as RNTextInput,
	Text,
} from 'react-native';
import colors from 'tailwindcss/colors';
import styles from './TextInput.style';

type InputProps = {
	startIcon?: React.ReactElement;
	endIcon?: React.ReactElement;
	styleNW?: string;
} & TextInputProps;

const TextInput = ({
	placeholder,
	endIcon = undefined,
	style,
	styleNW = '',
	...textInputProps
}: InputProps) => {
	return (
		<View className={`${styles.textInputWrapper} ${styleNW}`}>
			<RNTextInput
				selectionColor={colors.white}
				testID="text-input"
				placeholderTextColor={colors.white}
				style={{ color: colors.white }}
				autoCorrect
				spellCheck
				editable
				placeholder={placeholder}
				{...textInputProps}
			/>

			{endIcon && (
				<View testID="end-icon-wrapper" className={styles.endIcon}>
					<Text>E</Text>
				</View>
			)}
		</View>
	);
};

export default TextInput;
