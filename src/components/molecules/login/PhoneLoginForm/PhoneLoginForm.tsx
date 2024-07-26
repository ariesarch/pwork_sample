import { View, Pressable } from 'react-native';
import { useState } from 'react';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { useColorScheme } from 'nativewind';
import { PasswordEyeCloseIcon, PasswordEyeIcon } from '@/util/svg/icon.common';
import { Button } from '@/components/ui/Button/Button';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { useNavigation } from '@react-navigation/native';

const PhoneLoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [pwVisibility, setPwVissibility] = useState({
		password: false,
	});
	const { colorScheme, toggleColorScheme } = useColorScheme();
	const navigation = useNavigation();

	return (
		<View>
			<TextInput
				placeholder="Phone Number"
				onChangeText={email => setFormData(prev => ({ ...prev, email }))}
				value={formData.email}
				maxLength={40}
				styleNW="mb-6 mt-8"
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

			<View className="flex flex-row justify-end mb-6">
				<Pressable onPress={() => {}}>
					<ThemeText className="font-semibold">Forget your password?</ThemeText>
				</Pressable>
			</View>
			<Button onPress={() => navigation.navigate('Index')} className="my-3">
				<ThemeText className="text-white">Login</ThemeText>
			</Button>
		</View>
	);
};

export default PhoneLoginForm;
