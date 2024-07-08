import { useState } from 'react';
import { View } from 'react-native';
import TabSwitch from '@/components/molecules/TabSwitch/TabSwitch';
import EmailRegisterForm from '@/components/molecules/EmailRegisterForm/EmailRegisterForm';
import { SafeScreen } from '@/components/template';
import PhoneRegisterForm from '@/components/molecules/PhoneRegisterForm/PhoneRegisterForm';
import { useGetUser } from '@/hooks/queries/auth.queries';

function Register() {
	const [activeTab, setActiveTab] = useState('1');
	const { data: user } = useGetUser({ id: '1' });
	// eslint-disable-next-line no-console
	console.log('user::', user);

	return (
		<SafeScreen>
			<View className="mx-8">
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
