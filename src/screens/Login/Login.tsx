import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import TabSwitch from '@/components/molecules/TabSwitch/TabSwitch';
import EmailRegisterForm from '@/components/molecules/EmailRegisterForm/EmailRegisterForm';
import { useGetUser } from '@/hooks/queries/auth.queries';
import { SafeScreen } from '@/components/template';import Header from '@/components/atoms/header/header';
import { BackIcon } from '@/util/svg/icon.common';
import EmailLoginForm from '@/components/molecules/EmailLoginForm/EmailLoginForm';
import PhoneLoginForm from '@/components/molecules/PhoneLoginForm/PhoneLoginForm';

function Login() {
	const [activeTab, setActiveTab] = useState('1');
	const { data: user } = useGetUser({ id: '1' });

	return (
	<SafeScreen>
			<Header
				title="Log in"
				leftCustomComponent={
					<Pressable onPress={() => {}}>
						<BackIcon />
					</Pressable>
				}
			/>
			<View className="mx-8">
				<TabSwitch
					tabs={[
						{ value: '1', label: 'Email' },
						{ value: '2', label: 'Phone number' },
					]}
					onTabPress={setActiveTab}
					currentTab={activeTab}
				/>
				{/* {activeTab === '1' && <EmailLoginForm />}
				{activeTab === '2' && <PhoneLoginForm />} */}
				{activeTab === '1' ? <EmailLoginForm /> : <PhoneLoginForm />}
			</View>
		</SafeScreen>
	);
}

export default Login;
