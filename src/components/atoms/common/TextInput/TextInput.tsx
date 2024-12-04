import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import { View, TextInputProps, TextInput as RNTextInput } from 'react-native';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
// import { PasswordEyeCloseIcon, PasswordEyeIcon } from '@/util/svg/icon.common';
import { cn } from '@/util/helper/twutil';
import { type ClassValue } from 'clsx';
import styles from './TextInput.style';

type InputProps = {
	startIcon?: React.ReactElement;
	endIcon?: React.ReactElement;
	extraContainerStyle?: ClassValue;
	extraInputStyle?: ClassValue;
	showUnderLine?: boolean;
	textArea?: boolean;
} & TextInputProps;

const TextInput = forwardRef<RNTextInput, InputProps>(
	(
		{
			endIcon = undefined,
			startIcon = undefined,
			placeholder,
			extraContainerStyle = '',
			extraInputStyle = '',
			showUnderLine = false,
			textArea = false,
			...textInputProps
		}: InputProps,
		ref: Ref<RNTextInput>,
	) => {
		const inputColor = useAppropiateColorHash('patchwork-light-900');
		const selectionColor = useAppropiateColorHash('patchwork-red-50');
		const [isFocused, setIsFocused] = useState(false);

		return (
			<View
				className={cn(
					styles.textInputWrapper,
					startIcon ? 'pl-9' : 'pl-5',
					showUnderLine ? 'border-b border-b-patchwork-red-50' : '',
					textArea ? 'h-32' : 'h-12',
					extraContainerStyle,
				)}
			>
				{startIcon && (
					<View testID="start-icon-wrapper" className={styles.startIcon}>
						{startIcon}
					</View>
				)}
				<RNTextInput
					ref={ref}
					selectionColor={selectionColor}
					testID="text-input"
					placeholderTextColor={inputColor}
					style={[{ color: inputColor }]}
					autoCorrect
					autoCapitalize="none"
					spellCheck
					editable
					placeholder={placeholder}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					multiline={textArea}
					textAlignVertical={textArea ? 'top' : 'bottom'}
					{...textInputProps}
					className={cn(
						'font-SourceSans3_Regular',
						textArea ? 'h-32' : 'h-10',
						endIcon ? 'w-10/12' : 'w-full',
						extraInputStyle,
					)}
				/>

				{endIcon && (
					<View testID="end-icon-wrapper" className={styles.endIcon}>
						{endIcon}
					</View>
				)}
			</View>
		);
	},
);

export default TextInput;
