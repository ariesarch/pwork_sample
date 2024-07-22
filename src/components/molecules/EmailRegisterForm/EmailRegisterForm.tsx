import { Button, View } from 'react-native';
import { useState } from 'react';
import TextInput from '@/components/atoms/TextInput/TextInput';
import { useColorScheme } from 'nativewind';
import { PasswordEyeCloseIcon, PasswordEyeIcon } from '@/util/svg/icon.common';

const EmailRegisterForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirm_password: '',
		user_name: '',
	});
	const [pwVisibility, setPwVissibility] = useState({
		password: false,
		confirmPassword: false,
	});
	const { colorScheme, toggleColorScheme } = useColorScheme();

	return (
		<View>
			<TextInput
				placeholder="Email Address"
				onChangeText={email => setFormData(prev => ({ ...prev, email }))}
				value={formData.email}
				maxLength={40}
				styleNW="mb-6 mt-8"
			/>
			<TextInput
				placeholder="User Name"
				onChangeText={user_name =>
					setFormData(prev => ({ ...prev, user_name }))
				}
				value={formData.user_name}
				styleNW="mb-6"
			/>
			<TextInput
				placeholder="Password"
				onChangeText={password => setFormData(prev => ({ ...prev, password }))}
				value={formData.password}
				secureTextEntry={!pwVisibility.password}
				endIcon={
					pwVisibility.password ? (
						<PasswordEyeIcon
							fill={colorScheme === 'dark' ? 'white' : 'gray'}
							onPress={() =>
								setPwVissibility(prev => ({
									...prev,
									password: !prev.password,
								}))
							}
						/>
					) : (
						<PasswordEyeCloseIcon
							fill={colorScheme === 'dark' ? 'white' : 'gray'}
							onPress={() =>
								setPwVissibility(prev => ({
									...prev,
									password: !prev.password,
								}))
							}
						/>
					)
				}
				styleNW="mb-6"
			/>
			<TextInput
				placeholder="Confirm Password"
				onChangeText={confirm_password =>
					setFormData(prev => ({ ...prev, confirm_password }))
				}
				secureTextEntry={!pwVisibility.confirmPassword}
				value={formData.confirm_password}
				styleNW="mb-6"
				endIcon={
					pwVisibility.confirmPassword ? (
						<PasswordEyeIcon
							fill={colorScheme === 'dark' ? 'white' : 'gray'}
							onPress={() =>
								setPwVissibility(prev => ({
									...prev,
									confirmPassword: !prev.confirmPassword,
								}))
							}
						/>
					) : (
						<PasswordEyeCloseIcon
							fill={colorScheme === 'dark' ? 'white' : 'gray'}
							onPress={() =>
								setPwVissibility(prev => ({
									...prev,
									confirmPassword: !prev.confirmPassword,
								}))
							}
						/>
					)
				}
			/>
			<Button title="Test" onPress={() => toggleColorScheme()} />
		</View>
	);
};

export default EmailRegisterForm;
