import { useState } from 'react';
import { View } from 'react-native';
import TabSwitch from '@/components/molecules/common/TabSwitch/TabSwitch';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import Header from '@/components/atoms/common/Header/Header';
import PhoneLoginForm from '@/components/molecules/login/PhoneLoginForm/PhoneLoginForm';
import { GuestStackScreenProps } from '@/types/navigation';
import EmailLoginForm from '@/components/molecules/login/EmailLoginForm/EmailLoginForm';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login: React.FC<GuestStackScreenProps<'Login'>> = ({ navigation }) => {
	const [activeTab, setActiveTab] = useState('1');

	return (
		<SafeScreen>
			<Header
				hideUnderline
				title="Log in"
				leftCustomComponent={<BackButton />}
			/>
			<KeyboardAwareScrollView className="mx-8">
				<EmailLoginForm />
			</KeyboardAwareScrollView>
		</SafeScreen>
	);
};

export default Login;
