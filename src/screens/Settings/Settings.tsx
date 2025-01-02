import { queryClient } from '@/App';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';
import Header from '@/components/atoms/common/Header/Header';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useTokenRevokeMutation } from '@/hooks/mutations/auth.mutation';
import { usePushNotiRevokeTokenMutation } from '@/hooks/mutations/pushNoti.mutation';
import { useAuthStore, useAuthStoreAction } from '@/store/auth/authStore';
import { usePushNoticationStore } from '@/store/pushNoti/pushNotiStore';
import { handleError, removeAppToken } from '@/util/helper/helper';
import { AccountIcon, ChevronRightIcon, Logout } from '@/util/svg/icon.common';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

const Settings = () => {
	const [isAlertOpen, setAlert] = useState(false);
	const { mutateAsync, isPending } = usePushNotiRevokeTokenMutation({});
	const { clearAuthState } = useAuthStoreAction();
	const fcmToken = usePushNoticationStore(state => state.fcmToken);
	const { mutateAsync: mutateRevokeToken } = useTokenRevokeMutation({});
	const { access_token } = useAuthStore();
	const handleLogout = async () => {
		setAlert(false);
		try {
			if (fcmToken) {
				await mutateAsync({
					notification_token: fcmToken,
				});
			}
		} catch (error) {
			handleError(error);
		} finally {
			if (access_token) {
				await mutateRevokeToken({
					token: access_token,
				});
				await removeAppToken();
				clearAuthState();
				queryClient.clear();
			}
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
					onPress={() => {}}
				>
					<ThemeText>My Information</ThemeText>
					<ChevronRightIcon width={12} height={12} />
				</Pressable>
				<Pressable
					className="ml-10 mr-2 mt-4 flex-row items-center justify-between active:opacity-80"
					onPress={() => {}}
				>
					<ThemeText>Change Password</ThemeText>
					<ChevronRightIcon width={12} height={12} />
				</Pressable>
				<Pressable
					className="ml-10 mr-2 mt-4 flex-row items-center justify-between active:opacity-80"
					onPress={() => {}}
				>
					<ThemeText>Mute and Blocks</ThemeText>
					<ChevronRightIcon width={12} height={12} />
				</Pressable>
				<Pressable
					className="ml-10 mr-2 mt-4 flex-row items-center justify-between active:opacity-80"
					onPress={() => {}}
				>
					<ThemeText>Deactivate Account</ThemeText>
					<ChevronRightIcon width={12} height={12} />
				</Pressable>
			</View>
			<View className="justify-center items-center mx-auto mt-10 mb-5">
				<Pressable
					onPress={() => {
						setAlert(true);
					}}
					className="flex-row px-36 border border-gray-500 rounded-md py-4 justify-center items-center active:opacity-80"
				>
					<Logout width={25} height={25} className="mr-3" />
					<ThemeText className="text-center">Log Out</ThemeText>
				</Pressable>
			</View>
			{isAlertOpen && (
				<CustomAlert
					message={'Are u sure you want to logout?'}
					hasCancel
					handleCancel={() => {
						setAlert(false);
					}}
					handleOk={handleLogout}
					type="error"
				/>
			)}
		</SafeScreen>
	);
};

export default Settings;
