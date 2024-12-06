import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { Button } from '@/components/atoms/common/Button/Button';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';
import Header from '@/components/atoms/common/Header/Header';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import {
	useForgotPWMutation,
	useResetPWMutation,
} from '@/hooks/mutations/auth.mutation';
import { requestForgotPassword } from '@/services/auth.service';
import { GuestStackScreenProps } from '@/types/navigation';
import { forgetPWSchema } from '@/util/schema/forgotPwSchema';
import { resetPasswordSchema } from '@/util/schema/resetPasswordSchema';
import { PasswordEyeCloseIcon, PasswordEyeIcon } from '@/util/svg/icon.common';
import { yupResolver } from '@hookform/resolvers/yup';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

const ChangePassword: React.FC<GuestStackScreenProps<'ChangePassword'>> = ({
	navigation,
	route,
}) => {
	const [alertState, setAlert] = useState({ isOpen: false, isSuccess: false });
	const { reset_password_token } = route.params;
	const [pwVisibility, setPwVissibility] = useState({
		password: false,
		confirm_password: false,
	});
	const { colorScheme } = useColorScheme();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(resetPasswordSchema),
	});
	const { mutate, isPending } = useResetPWMutation({
		onSuccess: async response => {
			setAlert({ isOpen: true, isSuccess: true });
		},
		onError: error => {
			setAlert({ isOpen: true, isSuccess: false });
		},
	});

	const onSubmit = (data: any) => {
		if (!isPending) {
			mutate({
				reset_password_token,
				password: data.password,
				password_confirmation: data.confirmPassword,
			});
		}
	};

	return (
		<SafeScreen>
			<Header
				hideUnderline
				title="Reset Password"
				leftCustomComponent={<BackButton />}
			/>
			<View className="mx-8">
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
				<Controller
					name="confirmPassword"
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<View>
							<TextInput
								placeholder="Confirm Password"
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
								secureTextEntry={!pwVisibility.confirm_password}
								endIcon={
									<Pressable
										className="px-2 py-2 -mt-2 active:opacity-80"
										onPress={() =>
											setPwVissibility(prev => ({
												...prev,
												confirm_password: !prev.confirm_password,
											}))
										}
									>
										{pwVisibility.confirm_password ? (
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
							{errors.confirmPassword && (
								<ThemeText
									size="xs_12"
									variant={'textOrange'}
									className="-mt-2 mb-2"
								>
									{'*' + errors.confirmPassword.message}
								</ThemeText>
							)}
						</View>
					)}
				/>
				<Button onPress={handleSubmit(onSubmit)} className="h-[48]">
					{isPending ? (
						<Flow size={25} color={'#fff'} />
					) : (
						<ThemeText className="text-white">Submit</ThemeText>
					)}
				</Button>
				{alertState.isOpen && (
					<CustomAlert
						message={
							alertState.isSuccess
								? 'Updated Password Successfully'
								: 'Something went wrong'
						}
						title={alertState.isSuccess ? 'Success' : 'Failed'}
						handleCancel={() => {
							setAlert(prev => ({ ...prev, isOpen: false }));
						}}
						handleOk={() => {
							setAlert(prev => ({ ...prev, isOpen: false }));
							navigation.navigate('Login');
						}}
					/>
				)}
			</View>
		</SafeScreen>
	);
};
export default ChangePassword;
