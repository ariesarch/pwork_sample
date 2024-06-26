import { useTheme } from '@/theme';
import { useState } from 'react';
import { View } from 'react-native';
import TabSwitch from '@/components/molecules/TabSwitch/TabSwitch';
import EmailRegisterForm from '@/components/molecules/EmailRegisterForm/EmailRegisterForm';
import { SafeScreen } from '@/components/template';
import PhoneRegisterForm from '@/components/molecules/PhoneRegisterForm/PhoneRegisterForm';

function Register() {
	const [activeTab, setActiveTab] = useState('1');
	const { gutters } = useTheme();

	return (
		<SafeScreen>
			<View style={[gutters.marginHorizontal_24]}>
				<TabSwitch
					tabs={[
						{ value: '1', label: 'Email' },
						{ value: '2', label: 'Phone number' },
					]}
					onTabPress={setActiveTab}
					currentTab={activeTab}
				/>
				{activeTab === '1' && <EmailRegisterForm />}
				{activeTab === '2' && <PhoneRegisterForm />}
			</View>
		</SafeScreen>
	);
}

export default Register;
