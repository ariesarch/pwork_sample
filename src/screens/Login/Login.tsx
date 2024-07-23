import { useState } from 'react';
import { View, Pressable } from 'react-native';
import TabSwitch from '@/components/molecules/TabSwitch/TabSwitch';
import { SafeScreen } from '@/components/template';
import Header from '@/components/atoms/header/header';
import { BackIcon } from '@/util/svg/icon.common';
import EmailLoginForm from '@/components/molecules/EmailLoginForm/EmailLoginForm';
import PhoneLoginForm from '@/components/molecules/PhoneLoginForm/PhoneLoginForm';
import { useColorScheme } from 'nativewind';
import { RootScreenProps } from '@/types/navigation';

const Login: React.FC<RootScreenProps<'Login'>> = ({ navigation }) => {
	const [activeTab, setActiveTab] = useState('1');
	const { colorScheme } = useColorScheme();

	return (
		<SafeScreen>
			<Header
				title="Log in"
				leftCustomComponent={
					<Pressable onPress={() => {}}>
						<BackIcon
							colorScheme={colorScheme}
							onPress={() => navigation.goBack()}
						/>
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
				{activeTab === '1' ? <EmailLoginForm /> : <PhoneLoginForm />}
			</View>
		</SafeScreen>
	);
};

export default Login;
