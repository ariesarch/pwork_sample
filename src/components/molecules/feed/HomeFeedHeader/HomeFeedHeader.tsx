import Underline from '@/components/atoms/common/Underline/Underline';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { AddCommunityIcon, SettingIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import {
	View,
	ImageProps,
	Image,
	Pressable,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { removeAppToken } from '@/util/helper/helper';
import { useAuthStoreAction } from '@/store/auth/authStore';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useState } from 'react';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';
import customColor from '@/util/constant/color';
import { useActiveDomainAction } from '@/store/feed/activeDomain';

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

	const handleLogout = async () => {
		setMenuVisibility(false);
		Alert.alert(
			'Confirmation',
			'Are you sure you want to logout?',
			[
				{
					text: 'Cancel',
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: async () => {
						await removeAppToken();
						clearAuthState();
					},
				},
			],
			{ cancelable: false },
		);
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
					visible={isMenuOpen}
					anchor={
						<Pressable
							className="p-3 border border-slate-200 rounded-full active:opacity-80"
							onPress={() => setMenuVisibility(true)}
						>
							<SettingIcon colorScheme={colorScheme} />
						</Pressable>
					}
					style={{ marginTop: 50 }}
					onRequestClose={() => setMenuVisibility(false)}
				>
					<MenuItem onPress={handleLogout} textStyle={{ color: '#000' }}>
						Logout
					</MenuItem>
					<MenuDivider />
				</Menu>
			</View>
			{showUnderLine && <Underline className="mt-2" />}
			{isAlertOpen && (
				<CustomAlert
					message={'Are u sure you want to logout'}
					title="Logout"
					hasCancel
					handleCancel={() => {
						setAlert(false);
					}}
					handleOk={() => {}}
				/>
			)}
		</View>
	);
};

export default HomeFeedHeader;
