import Underline from '@/components/atoms/common/Underline/Underline';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { SettingIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { View, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@/types/navigation';

type Props = {
	account: Pathchwork.Account;
	showUnderLine?: boolean;
};

const HomeFeedHeader = ({ account, showUnderLine = true }: Props) => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const { colorScheme } = useColorScheme();
	const { setDomain } = useActiveDomainAction();

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
				<Pressable
					className="p-3 border border-slate-200 rounded-full active:opacity-80"
					onPress={() => {
						navigation.navigate('Settings');
					}}
				>
					<SettingIcon colorScheme={colorScheme} />
				</Pressable>
			</View>
			{showUnderLine && <Underline className="mt-2" />}
		</View>
	);
};

export default HomeFeedHeader;
