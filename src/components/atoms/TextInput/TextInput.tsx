import { useTheme } from '@/theme';
import { styleConstant } from '@/theme/_config';
import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	TextInput as RNTextInput,
	Text,
} from 'react-native';

type InputProps = {
	startIcon?: React.ReactElement;
	endIcon?: React.ReactElement;
} & TextInputProps;

const TextInput = ({
	placeholder,
	endIcon = undefined,
	style,
	...textInputProps
}: InputProps) => {
	const { colors } = useTheme();
	return (
		<View style={[styles.inputStyle, style]}>
			<RNTextInput
				selectionColor={colors.white100}
				testID="text-input"
				placeholderTextColor={colors.white100}
				style={{ color: colors.white100 }}
				autoCorrect
				spellCheck
				editable
				placeholder={placeholder}
				{...textInputProps}
			/>

			{endIcon && (
				<View testID="end-icon-wrapper" style={styles.rightIcon}>
					<Text>E</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	inputStyle: {
		backgroundColor: styleConstant.Color.gray600,
		paddingLeft: styleConstant.Spacing.M + 2,
		height: 50,
		borderRadius: styleConstant.Spacing.XS,
		color: styleConstant.Color.white100,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rightIcon: {
		paddingHorizontal: styleConstant.Spacing.S,
	},
});

export default TextInput;
