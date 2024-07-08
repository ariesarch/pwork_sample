import TextInput from '@/components/atoms/TextInput/TextInput';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { View } from 'react-native';

const PhoneRegisterForm = () => {
	const [formData, setFormData] = useState({
		phone: '',
		password: '',
		confirm_password: '',
		user_name: '',
	});
	const { gutters } = useTheme();

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
			/>
			<TextInput
				placeholder="Confirm Password"
				onChangeText={confirm_password =>
					setFormData(prev => ({ ...prev, confirm_password }))
				}
				value={formData.confirm_password}
				styleNW="mb-6"
			/>
		</View>
	);
};

export default PhoneRegisterForm;
