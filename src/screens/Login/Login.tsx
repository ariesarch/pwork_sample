import { useState } from 'react';
import { View } from 'react-native';
import TabSwitch from '@/components/molecules/common/TabSwitch/TabSwitch';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import Header from '@/components/atoms/common/header/header';
import PhoneLoginForm from '@/components/molecules/login/PhoneLoginForm/PhoneLoginForm';
import { useColorScheme } from 'nativewind';
import { RootScreenProps } from '@/types/navigation';
import EmailLoginForm from '@/components/molecules/login/EmailLoginForm/EmailLoginForm';
import BackButton from '@/components/atoms/common/BackButton/BackButton';

const Login: React.FC<RootScreenProps<'Login'>> = ({ navigation }) => {
	const [activeTab, setActiveTab] = useState('1');
	const { colorScheme } = useColorScheme();

	return (
		<SafeScreen>
			<Header title="Log in" leftCustomComponent={<BackButton />} />
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
