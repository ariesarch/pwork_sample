/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import TabSwitch from '@/components/molecules/TabSwitch/TabSwitch';
import EmailRegisterForm from '@/components/molecules/EmailRegisterForm/EmailRegisterForm';
import { SafeScreen } from '@/components/template';
import PhoneRegisterForm from '@/components/molecules/PhoneRegisterForm/PhoneRegisterForm';
import Header from '@/components/atoms/header/header';
import { BackIcon } from '@/util/svg/icon.common';
import AlreadyHaveAcc from '@/components/molecules/AlreadyHaveAcc/AlreadyHaveAcc';
import { useColorScheme } from 'nativewind';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootScreenProps } from '@/types/navigation';

const Register: React.FC<RootScreenProps<'Register'>> = ({ navigation }) => {
	const [activeTab, setActiveTab] = useState('1');
	const { colorScheme } = useColorScheme();

	return (
		<SafeScreen>
			<Header
				title="Create an account"
				leftCustomComponent={
					<Pressable onPress={() => navigation.goBack()}>
						<BackIcon colorScheme={colorScheme} />
					</Pressable>
				}
			/>
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
