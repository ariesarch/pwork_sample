import { useState } from 'react';
import { Pressable, View } from 'react-native';
import TabSwitch from '@/components/molecules/TabSwitch/TabSwitch';
import EmailRegisterForm from '@/components/molecules/EmailRegisterForm/EmailRegisterForm';
import { SafeScreen } from '@/components/template';
import PhoneRegisterForm from '@/components/molecules/PhoneRegisterForm/PhoneRegisterForm';
import Header from '@/components/atoms/header/header';
import { BackIcon } from '@/util/svg/icon.common';
import AlreadyHaveAcc from '@/components/molecules/AlreadyHaveAcc/AlreadyHaveAcc';

function Register() {
	const [activeTab, setActiveTab] = useState('1');

	return (
		<SafeScreen>
			<Header
				title="Create an account"
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
				{activeTab === '1' ? <EmailRegisterForm /> : <PhoneRegisterForm />}
			</View>
			<AlreadyHaveAcc className="absolute bottom-10 mx-auto w-full" />
		</SafeScreen>
	);
}

export default Register;
