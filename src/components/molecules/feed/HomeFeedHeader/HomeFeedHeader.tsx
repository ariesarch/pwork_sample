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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { removeAppToken } from '@/util/helper/helper';
import { useAuthStoreAction } from '@/store/auth/authStore';

type Props = {
	account: Pathchwork.Account;
	showUnderLine?: boolean;
};

const HomeFeedHeader = ({ account, showUnderLine = true }: Props) => {
	const navigation = useNavigation();
	const { colorScheme } = useColorScheme();
	const { clearAuthState } = useAuthStoreAction();

	const handleLogout = async () => {
		await removeAppToken();
		clearAuthState();
	};

	return (
		<View>
			<View className="flex flex-row items-center mx-6 pb-2">
				<TouchableOpacity
					activeOpacity={0.8}
					className="flex-row flex-1 items-center"
					onPress={() =>
						navigation.navigate('Profile', {
							id: account.id,
						})
					}
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
				<Pressable
					className="p-3 border border-slate-200 rounded-full active:opacity-80"
					onPress={handleLogout}
				>
					<SettingIcon colorScheme={colorScheme} />
				</Pressable>
			</View>
			{showUnderLine && <Underline className="mt-2" />}
		</View>
	);
};

export default HomeFeedHeader;
