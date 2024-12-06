import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { GuestStackScreenProps, RootScreenProps } from '@/types/navigation';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
	useForgotPWMutation,
	useOTPVerificationMutation,
} from '@/hooks/mutations/auth.mutation';
import Toast from 'react-native-toast-message';

const ForgotPasswordOTP: React.FC<
	GuestStackScreenProps<'ForgotPasswordOTP'>
> = ({ navigation, route }) => {
	const [activeStep, setActiveStep] = useState(1);
	const { email, reset_password_token } = route.params;
	const [currentSecretToken, setCurrentSecretToken] =
		useState(reset_password_token);
	const [timer, setTimer] = useState(60);
	const [code, setCode] = useState('');
	const ref = useBlurOnFulfill({ value: code, cellCount: 4 });
	const { colorScheme } = useColorScheme();

	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: code,
		setValue: setCode,
	});

	const { mutate } = useOTPVerificationMutation({
		onSuccess: response => {
			navigation.navigate('ChangePassword', {
				reset_password_token: currentSecretToken,
			});
		},
		onError: () => {
			Toast.show({
				type: 'errorToast',
				text1: 'Incorrect OTP',
				position: 'top',
				topOffset: 50,
			});
		},
	});

	const { mutate: resendCode, isPending } = useForgotPWMutation({
		onSuccess: async response => {
			setCurrentSecretToken(response.reset_password_token);
			Toast.show({
				type: 'successToast',
				text1: 'Send OTP Successfully',
				position: 'top',
				topOffset: 50,
			});
		},
		onError: () => {
			Toast.show({
				type: 'errorToast',
				text1: 'Somethings Went Wrong',
				position: 'top',
				topOffset: 50,
			});
		},
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
			mutate({ id: currentSecretToken, otp_secret: code });
		}
	}, [code]);

	const handleResendCode = () => {
		resendCode({ email });
	};

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
				<ThemeText className=" mb-4">{email}</ThemeText>
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
				{timer > 0 && (
					<ThemeText>
						Don&apos;t receive your code? Re-send in {timer} sec..
					</ThemeText>
				)}
				{timer == 0 && (
					<ThemeText>
						Don&apos;t receive your code?{' '}
						<Pressable
							onPress={handleResendCode}
							className="active:opacity-75 -mt-[3]"
						>
							<ThemeText className="text-red-500">Re-send</ThemeText>
						</Pressable>
					</ThemeText>
				)}
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

export default ForgotPasswordOTP;
