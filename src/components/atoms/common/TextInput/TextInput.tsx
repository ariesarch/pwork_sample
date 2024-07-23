import React from 'react';
import { View, TextInputProps, TextInput as RNTextInput } from 'react-native';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
// import { PasswordEyeCloseIcon, PasswordEyeIcon } from '@/util/svg/icon.common';
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
	const inputColor = useAppropiateColorHash('patchwork-light-900');
	return (
		<View className={`${styles.textInputWrapper} ${styleNW}`}>
			<RNTextInput
				selectionColor={inputColor}
				testID="text-input"
				placeholderTextColor={inputColor}
				style={{ color: inputColor }}
				autoCorrect
				spellCheck
				editable
				placeholder={placeholder}
				{...textInputProps}
				className="w-full"
			/>

			{endIcon && (
				<View testID="end-icon-wrapper" className={styles.endIcon}>
					{endIcon}
				</View>
			)}
		</View>
	);
};

export default TextInput;
