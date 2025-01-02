import { queryClient } from '@/App';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';
import Header from '@/components/atoms/common/Header/Header';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { usePushNotiRevokeTokenMutation } from '@/hooks/mutations/pushNoti.mutation';
import { useAuthStoreAction } from '@/store/auth/authStore';
import { usePushNoticationStore } from '@/store/pushNoti/pushNotiStore';
import { SettingStackScreenProps } from '@/types/navigation';
import { removeAppToken } from '@/util/helper/helper';
import { AccountIcon, ChevronRightIcon, Logout } from '@/util/svg/icon.common';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import VersionInfo from 'react-native-version-info';

const Settings: React.FC<SettingStackScreenProps<'Settings'>> = ({
	navigation,
}) => {
	const [isAlertOpen, setAlert] = useState(false);
	const { mutateAsync, isPending } = usePushNotiRevokeTokenMutation({});
	const { clearAuthState } = useAuthStoreAction();
	const fcmToken = usePushNoticationStore(state => state.fcmToken);

	const handleLogout = async () => {
		setAlert(false);
		try {
			if (fcmToken) {
				await mutateAsync({
					notification_token: fcmToken,
				});
			}
		} catch (error) {
			console.error('Error during logout process:', error);
		} finally {
			await removeAppToken();
			clearAuthState();
			queryClient.clear();
		}
	};
	return (
		<SafeScreen>
			<Header title="Settings" leftCustomComponent={<BackButton />} />
			<View className="flex-1 mx-5">
				<View className="flex-row items-center">
					<AccountIcon width={30} height={30} className="mr-2" />
					<ThemeText className="font-bold">Account Settings</ThemeText>
				</View>
				<Pressable
					className="ml-10 mr-2 mt-4 flex-row items-center justify-between active:opacity-80"
					onPress={() => {
						navigation.navigate('MyInformation');
					}}
				>
					<ThemeText>My Information</ThemeText>
					<ChevronRightIcon width={12} height={12} />
				</Pressable>
				<Pressable
					className="ml-10 mr-2 mt-4 flex-row items-center justify-between active:opacity-80"
					onPress={() => navigation.navigate('UpdatePassword')}
				>
					<ThemeText>Change Password</ThemeText>
					<ChevronRightIcon width={12} height={12} />
				</Pressable>
				<Pressable
					className="ml-10 mr-2 mt-4 flex-row items-center justify-between active:opacity-80"
					onPress={() => navigation.navigate('MuteAndBlockList')}
				>
					<ThemeText>Mute and Blocks</ThemeText>
					<ChevronRightIcon width={12} height={12} />
				</Pressable>
				{/* <Pressable
					className="ml-10 mr-2 mt-4 flex-row items-center justify-between active:opacity-80"
					onPress={() => {}}
				>
					<ThemeText>Deactivate Account</ThemeText>
					<ChevronRightIcon width={12} height={12} />
				</Pressable> */}
			</View>
			<View className="justify-center items-center mt-10 mb-8 mx-8">
				<View className="flex-row">
					<ThemeText
						className="my-4 active:opacity-80"
						variant="textOrange"
						onPress={() => {}}
					>
						Term & Conditions,{' '}
					</ThemeText>
					<ThemeText
						className="my-4 active:opacity-80"
						variant="textOrange"
						onPress={() => {}}
					>
						Privacy Policy,{' '}
					</ThemeText>
					<ThemeText
						className="my-4 active:opacity-80"
						variant="textOrange"
						onPress={() => {}}
					>
						Community Guidelines
					</ThemeText>
				</View>
				<ThemeText className="mb-4">
					{' '}
					v.
					{VersionInfo.appVersion || '1.0.0'}
				</ThemeText>
				<Pressable
					onPress={() => {
						setAlert(true);
					}}
					className="flex-row w- border w-full md:w-[300] border-gray-500 rounded-md py-4 justify-center items-center active:opacity-80"
				>
					<Logout width={25} height={25} className="mr-3" />
					<ThemeText className="text-center">Log Out</ThemeText>
				</Pressable>
			</View>
			<CustomAlert
				isVisible={isAlertOpen}
				message={'Are u sure you want to logout?'}
				hasCancel
				handleCancel={() => {
					setAlert(false);
				}}
				handleOk={handleLogout}
				type="error"
			/>
		</SafeScreen>
	);
};

export default Settings;
