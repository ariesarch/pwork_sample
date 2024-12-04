import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { Button } from '@/components/atoms/common/Button/Button';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';
import Header from '@/components/atoms/common/Header/Header';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useForgotPWMutation } from '@/hooks/mutations/auth.mutation';
import { requestForgotPassword } from '@/services/auth.service';
import { GuestStackScreenProps } from '@/types/navigation';
import { forgetPWSchema } from '@/util/schema/forgotPwSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

const ForgotPassword: React.FC<GuestStackScreenProps<'ForgotPassword'>> = ({
	navigation,
}) => {
	const [alertState, setAlert] = useState({ isOpen: false, isSuccess: false });
	const [token, setToken] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({
		resolver: yupResolver(forgetPWSchema),
	});
	const { mutate, isPending } = useForgotPWMutation({
		onSuccess: async response => {
			setAlert({ isOpen: true, isSuccess: true });
			setToken(response.reset_password_token);
		},
		onError: error => {
			setAlert({ isOpen: true, isSuccess: false });
		},
	});

	const onSubmit = (data: any) => {
		if (!isPending) {
			mutate({ email: data.email });
		}
		// navigation.navigate('ForgotPasswordOTP', {
		// 	email: 'kgkg@gmail.com',
		// 	reset_password_token: '44',
		// });
	};

	return (
		<SafeScreen>
			<Header
				hideUnderline
				title="Forget Password"
				leftCustomComponent={<BackButton />}
			/>
			<View className="mx-8">
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
								? 'Please check your mail'
								: 'Record not found'
						}
						title={alertState.isSuccess ? 'Success' : 'Failed'}
						handleCancel={() => {
							setAlert(prev => ({ ...prev, isOpen: false }));
							if (alertState.isSuccess) {
								navigation.navigate('ForgotPasswordOTP', {
									email: getValues('email'),
									reset_password_token: token,
								});
							}
						}}
						handleOk={() => {
							setAlert(prev => ({ ...prev, isOpen: false }));
							if (alertState.isSuccess) {
								navigation.navigate('ForgotPasswordOTP', {
									email: getValues('email'),
									reset_password_token: token,
								});
							}
						}}
					/>
				)}
			</View>
		</SafeScreen>
	);
};
export default ForgotPassword;
