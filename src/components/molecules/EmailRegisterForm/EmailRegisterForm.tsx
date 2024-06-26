import { View } from 'react-native';
import { useState } from 'react';
import TextInput from '@/components/atoms/TextInput/TextInput';
import { useTheme } from '@/theme';

const EmailRegisterForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirm_password: '',
		user_name: '',
	});
	const { gutters } = useTheme();

	return (
		<View>
			<TextInput
				placeholder="Email Address"
				onChangeText={email => setFormData(prev => ({ ...prev, email }))}
				value={formData.email}
				style={[gutters.marginBottom_24, gutters.marginTop_32]}
			/>
			<TextInput
				placeholder="User Name"
				onChangeText={user_name =>
					setFormData(prev => ({ ...prev, user_name }))
				}
				value={formData.user_name}
				style={gutters.marginBottom_24}
			/>
			<TextInput
				placeholder="Password"
				onChangeText={password => setFormData(prev => ({ ...prev, password }))}
				value={formData.password}
				style={gutters.marginBottom_24}
			/>
			<TextInput
				placeholder="Confirm Password"
				onChangeText={confirm_password =>
					setFormData(prev => ({ ...prev, confirm_password }))
				}
				value={formData.confirm_password}
				style={gutters.marginBottom_24}
			/>
		</View>
	);
};

export default EmailRegisterForm;
