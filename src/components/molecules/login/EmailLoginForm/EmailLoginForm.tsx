import { View, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { useColorScheme } from 'nativewind';
import { PasswordEyeCloseIcon, PasswordEyeIcon } from '@/util/svg/icon.common';
import { Button } from '@/components/atoms/common/Button/Button';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/util/schema/loginSchema';
import { useLoginEmailMutation } from '@/hooks/mutations/auth.mutation';
import { Flow } from 'react-native-animated-spinkit';
import { HTTP_ERROR_MESSAGE } from '@/util/constant';
import { useAuthStoreAction } from '@/store/auth/authStore';
import { saveAppToken } from '@/util/helper/helper';
import { verifyAuthToken } from '@/services/auth.service';
import { GuestStackParamList } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';

const EmailLoginForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});
	const { setAuthToken, setUserInfo } = useAuthStoreAction();
	const [isAlertOpen, setAlert] = useState(false);
	const navigation = useNavigation<StackNavigationProp<GuestStackParamList>>();

	const { mutateAsync, isPending } = useLoginEmailMutation({
		onSuccess: async response => {
			await saveAppToken('AUTH_TOKEN', response.access_token);
			const userInfo = await verifyAuthToken();
			setUserInfo(userInfo);
			setAuthToken(response.access_token);
		},
		onError: error => {
			if (error.status == 400) {
				if (error?.message == HTTP_ERROR_MESSAGE?.INVALID_GRANT) {
					// Alert.alert('Error', 'Invalid login credentials');
					setAlert(true);
				}
			}
		},
	});

	const [pwVisibility, setPwVissibility] = useState({
		password: false,
	});

	const { colorScheme } = useColorScheme();

	const onSubmit = (data: any) => {
		if (!isPending) {
			mutateAsync({ username: data.email, password: data.password });
		}
	};

	return (
		<View>
			<Controller
				name="email"
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<View>
						<TextInput
							placeholder="Email Address"
							onChangeText={onChange}
							value={value}
							onBlur={onBlur}
							maxLength={40}
							inputMode="email"
							extraContainerStyle="mb-6 mt-8"
						/>
						{errors.email && (
							<ThemeText
								size="xs_12"
								variant={'textOrange'}
								className="-mt-4 mb-2"
							>
								{'*' + errors.email.message}
							</ThemeText>
						)}
					</View>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<View>
						<TextInput
							placeholder="Password"
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
							secureTextEntry={!pwVisibility.password}
							endIcon={
								<Pressable
									className="px-2 py-2 -mt-2 active:opacity-80"
									onPress={() =>
										setPwVissibility(prev => ({
											...prev,
											password: !prev.password,
										}))
									}
								>
									{pwVisibility.password ? (
										<PasswordEyeIcon
											fill={colorScheme === 'dark' ? 'white' : 'gray'}
											className=""
										/>
									) : (
										<PasswordEyeCloseIcon
											fill={colorScheme === 'dark' ? 'white' : 'gray'}
										/>
									)}
								</Pressable>
							}
							extraContainerStyle="mb-4"
						/>
						{errors.password && (
							<ThemeText
								size="xs_12"
								variant={'textOrange'}
								className="-mt-2 mb-2"
							>
								{'*' + errors.password.message}
							</ThemeText>
						)}
					</View>
				)}
			/>

			<View className="flex flex-row justify-end mb-6">
				<Pressable
					onPress={() => navigation.navigate('ForgotPassword')}
					className="active:opacity-90"
				>
					<ThemeText>Forgot your password?</ThemeText>
				</Pressable>
			</View>
			<Button onPress={handleSubmit(onSubmit)} className="my-3">
				{isPending ? (
					<Flow size={25} color={'#fff'} />
				) : (
					<ThemeText className="text-white">Login</ThemeText>
				)}
			</Button>
			<CustomAlert
				isVisible={isAlertOpen}
				extraTitleStyle="text-white text-center -ml-2"
				extraOkBtnStyle="text-white"
				message={'Invalid login credentials'}
				title="Error"
				handleCancel={() => setAlert(false)}
				handleOk={() => setAlert(false)}
				type="error"
			/>
		</View>
	);
};

export default EmailLoginForm;
