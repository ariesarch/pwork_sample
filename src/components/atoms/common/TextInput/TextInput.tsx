import React, { forwardRef, useState } from 'react';
import { View, TextInputProps, TextInput as RNTextInput } from 'react-native';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
// import { PasswordEyeCloseIcon, PasswordEyeIcon } from '@/util/svg/icon.common';
import styles from './TextInput.style';

type InputProps = {
	startIcon?: React.ReactElement;
	endIcon?: React.ReactElement;
	styleNW?: string;
	showUnderLine?: boolean;
} & TextInputProps;

const TextInput = ({
	endIcon = undefined,
	startIcon = undefined,
	placeholder,
	styleNW = '',
	showUnderLine = false,
	...textInputProps
}: InputProps) => {
	const inputColor = useAppropiateColorHash('patchwork-light-900');
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View
			className={`${styles.textInputWrapper} ${styleNW} ${
				startIcon ? 'pl-9' : 'pl-5'
			} ${
				isFocused && showUnderLine ? 'border-b border-b-patchwork-red-50' : ''
			}`}
		>
			{startIcon && (
				<View testID="start-icon-wrapper" className={styles.startIcon}>
					{startIcon}
				</View>
			)}
			<RNTextInput
				selectionColor={inputColor}
				testID="text-input"
				placeholderTextColor={inputColor}
				style={[{ color: inputColor }]}
				autoCorrect
				spellCheck
				editable
				placeholder={placeholder}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
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
