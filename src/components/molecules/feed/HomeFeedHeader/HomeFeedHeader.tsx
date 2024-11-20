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

type Props = {
	account: Pathchwork.Account;
	showUnderLine?: boolean;
};

const HomeFeedHeader = ({ account, showUnderLine = true }: Props) => {
	const navigation = useNavigation();
	const { colorScheme } = useColorScheme();
	return (
		<View className="mt-4">
			<View className="flex flex-row items-center mx-6 pb-2">
				<TouchableOpacity
					activeOpacity={0.8}
					className="flex-row flex-1 items-center"
					disabled
					// onPress={
					// 	() =>
					// 		navigation.navigate('Profile', {
					// 			id: account.id ?? '113087366884543068',
					// 		}) //temp
					// }
				>
					<Image
						source={account.avatar as ImageProps}
						className="w-[60] h-[60] rounded-full"
					/>
					<View className="flex flex-1 mx-3">
						<ThemeText className="font-bold" size="md_16">
							Welcome Back
						</ThemeText>
						<ThemeText variant="textGrey" size="xs_12">
							Account Name
						</ThemeText>
					</View>
				</TouchableOpacity>
				{/* <Pressable
					className="p-3 border border-slate-200 rounded-full active:opacity-80 mr-2"
					onPress={() => navigation.navigate('ChannelCreate')}
				>
					<AddCommunityIcon colorScheme={colorScheme} />
				</Pressable> */}
				<Pressable className="p-3 border border-slate-200 rounded-full active:opacity-80">
					<SettingIcon colorScheme={colorScheme} />
				</Pressable>
			</View>
			{showUnderLine && <Underline className="mt-2" />}
		</View>
	);
};

export default HomeFeedHeader;
