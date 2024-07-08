import { View } from 'react-native';
import { useState } from 'react';
import TextInput from '@/components/atoms/TextInput/TextInput';

const EmailRegisterForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirm_password: '',
		user_name: '',
	});

	return (
		<View>
			<TextInput
				placeholder="Email Address"
				onChangeText={email => setFormData(prev => ({ ...prev, email }))}
				value={formData.email}
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

export default EmailRegisterForm;
