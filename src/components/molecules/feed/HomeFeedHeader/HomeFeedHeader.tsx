import Underline from '@/components/atoms/common/Underline/Underline';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { SettingIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { View, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { removeAppToken } from '@/util/helper/helper';
import { useAuthStoreAction } from '@/store/auth/authStore';
import { useState } from 'react';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import { usePushNotiRevokeTokenMutation } from '@/hooks/mutations/pushNoti.mutation';
import { usePushNoticationStore } from '@/store/pushNoti/pushNotiStore';
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
	renderers,
} from 'react-native-popup-menu';
import { queryClient } from '@/App';

type Props = {
	account: Pathchwork.Account;
	showUnderLine?: boolean;
};

const HomeFeedHeader = ({ account, showUnderLine = true }: Props) => {
	const navigation = useNavigation();
	const { colorScheme } = useColorScheme();
	const { clearAuthState } = useAuthStoreAction();
	const [isMenuOpen, setMenuVisibility] = useState(false);
	const [isAlertOpen, setAlert] = useState(false);
	const { setDomain } = useActiveDomainAction();
	const { mutateAsync, isPending } = usePushNotiRevokeTokenMutation({});

	const fcmToken = usePushNoticationStore(state => state.fcmToken);

	const handlePressLogoutOption = () => {
		setMenuVisibility(false);
		setAlert(true);
	};

	const handlePressLogoutConf = async () => {
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
		<View className="mt-4">
			<View className="flex flex-row items-center mx-6 pb-2">
				<TouchableOpacity
					activeOpacity={0.8}
					className="flex-row flex-1 items-center"
					onPress={() => {
						setDomain('channel.org');
						navigation.navigate('Profile', {
							id: account.id,
						});
					}}
				>
					<FastImage
						className="bg-patchwork-dark-50 w-[60] h-[60] rounded-full"
						source={{
							uri: account.avatar,
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.cover}
					/>
					<View className="flex flex-1 mx-3">
						<ThemeText className="font-bold" size="md_16">
							Welcome Back
						</ThemeText>
						<ThemeText variant="textGrey" size="xs_12">
							{account.display_name}
						</ThemeText>
					</View>
				</TouchableOpacity>
				<Menu
					renderer={renderers.Popover}
					rendererProps={{
						placement: 'left',
						anchorStyle: {
							width: 0,
							height: 0,
						},
					}}
					opened={isMenuOpen}
					style={{ zIndex: 1000 }}
					onBackdropPress={() => setMenuVisibility(false)}
					onSelect={option => {
						if (option === 'logout') handlePressLogoutOption();
					}}
				>
					<MenuTrigger>
						<Pressable
							className="p-3 border border-slate-200 rounded-full active:opacity-80"
							onPress={() => setMenuVisibility(true)}
						>
							<SettingIcon colorScheme={colorScheme} />
						</Pressable>
					</MenuTrigger>
					<MenuOptions
						customStyles={{
							optionsContainer: {
								borderRadius: 3,
							},
						}}
					>
						<MenuOption
							value={'logout'}
							style={{
								paddingVertical: 10,
								paddingHorizontal: 15,
								borderRadius: 3,
							}}
							text="Logout"
						/>
					</MenuOptions>
				</Menu>
			</View>
			{showUnderLine && <Underline className="mt-2" />}
			<CustomAlert
				isVisible={isAlertOpen}
				message={'Are u sure you want to logout?'}
				hasCancel
				handleCancel={() => {
					setAlert(false);
				}}
				handleOk={handlePressLogoutConf}
				type="error"
			/>
		</View>
	);
};

export default HomeFeedHeader;
