import { useState } from 'react';
import { View } from 'react-native';
import TabSwitch from '@/components/molecules/common/TabSwitch/TabSwitch';
import EmailRegisterForm from '@/components/molecules/login/EmailRegisterForm/EmailRegisterForm';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import PhoneRegisterForm from '@/components/molecules/login/PhoneRegisterForm/PhoneRegisterForm';
import Header from '@/components/atoms/common/Header/Header';
import AlreadyHaveAcc from '@/components/molecules/login/AlreadyHaveAcc/AlreadyHaveAcc';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GuestStackScreenProps } from '@/types/navigation';
import BackButton from '@/components/atoms/common/BackButton/BackButton';

const Register: React.FC<GuestStackScreenProps<'Register'>> = ({
	navigation,
}) => {
	const [activeTab, setActiveTab] = useState('1');

	return (
		<SafeScreen>
			<Header title="Create an account" leftCustomComponent={<BackButton />} />
			<KeyboardAwareScrollView
				contentContainerStyle={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
				className="flex-1"
			>
				<View className="mx-8 flex-1">
					<TabSwitch
						tabs={[
							{ value: '1', label: 'Email' },
							{ value: '2', label: 'Phone number' },
						]}
						onTabPress={setActiveTab}
						currentTab={activeTab}
					/>
					{activeTab === '1' ? <EmailRegisterForm /> : <PhoneRegisterForm />}
					<View className="flex-1" />
					<AlreadyHaveAcc className="mx-auto w-full mb-12" />
				</View>
			</KeyboardAwareScrollView>
		</SafeScreen>
	);
};

export default Register;
