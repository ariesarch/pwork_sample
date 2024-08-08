/* eslint-disable react-native/no-inline-styles */

import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { RootScreenProps } from '@/types/navigation';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const EmailVerification: React.FC<RootScreenProps<'EmailVerification'>> = ({
	navigation,
}) => {
	const [activeStep, setActiveStep] = useState(1);
	const [timer, setTimer] = useState(60);
	const [code, setCode] = useState('');
	const ref = useBlurOnFulfill({ value: code, cellCount: 4 });
	const { colorScheme } = useColorScheme();

	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: code,
		setValue: setCode,
	});

	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer(timer - 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	useEffect(() => {
		if (code.length === 4) {
			navigation.navigate('Index');
		}
	}, [code]);

	return (
		<SafeScreen>
			<Header
				title="Email Verification"
				leftCustomComponent={
					<BackButton
						customOnPress={() => {
							if (activeStep > 1) {
								setActiveStep(activeStep - 1);
							} else navigation.goBack();
						}}
					/>
				}
			/>
			<View className="flex items-center  h-full ">
				<ThemeText className=" mb-2">We sent a code to your email</ThemeText>
				<ThemeText className=" mb-4">email@email.com</ThemeText>
				<CodeField
					ref={ref}
					{...props}
					value={code}
					onChangeText={setCode}
					cellCount={4}
					rootStyle={styles.otpRoot}
					keyboardType="number-pad"
					textContentType="oneTimeCode"
					renderCell={({ index, symbol, isFocused }) => (
						<View
							onLayout={getCellOnLayoutHandler(index)}
							key={index}
							style={[
								styles.otpCell,
								isFocused && styles.cellFocus,
								{
									backgroundColor:
										colorScheme === 'dark' ? '#828689' : '#F2F7FC',
								},
							]}
						>
							<ThemeText>{symbol || (isFocused ? <Cursor /> : null)}</ThemeText>
						</View>
					)}
				/>
				<ThemeText>
					Don&apos;t receive your code? Re-send in {timer} sec..
				</ThemeText>
			</View>
		</SafeScreen>
	);
};

const styles = StyleSheet.create({
	otpRoot: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: 20,
	},
	otpCell: {
		width: 60,
		height: 60,
		borderRadius: 5,
		marginHorizontal: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cellFocus: {
		borderBottomWidth: 2,
		borderBottomColor: '#ED1800',
	},
});

export default EmailVerification;
