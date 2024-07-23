import Checkbox from '@/components/atoms/common/Checkbox/Checkbox.style';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { Button } from '@/components/ui/Button/Button';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { PasswordEyeCloseIcon, PasswordEyeIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

const PhoneRegisterForm = () => {
	const [formData, setFormData] = useState({
		phone: '',
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
				placeholder="Phone Number"
				onChangeText={phone => setFormData(prev => ({ ...prev, phone }))}
				value={formData.phone}
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
				styleNW="mb-6"
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
			/>
			<TextInput
				placeholder="Confirm Password"
				onChangeText={confirm_password =>
					setFormData(prev => ({ ...prev, confirm_password }))
				}
				value={formData.confirm_password}
				secureTextEntry={!pwVisibility.confirmPassword}
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
			<View className="mb-6">
				<Checkbox>
					<View className="mx-1 flex flex-row">
						<ThemeText variant="textGrey" className="ml-1">
							I agree to the{' '}
						</ThemeText>
						<Pressable onPress={() => {}}>
							<ThemeText className="font-semibold">
								Terms & Conditions
							</ThemeText>
						</Pressable>
					</View>
				</Checkbox>
			</View>
			<Button
				onPress={() => {
					toggleColorScheme();
				}}
				className="my-3"
			>
				<ThemeText className="text-white">Next</ThemeText>
			</Button>
		</View>
	);
};

export default PhoneRegisterForm;
