import Underline from '@/components/atoms/common/Underline/Underline';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { AddCommunityIcon, SettingIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { View, ImageProps, Image, Pressable } from 'react-native';

type Props = {
	account: Pathchwork.Account;
	showUnderLine?: boolean;
};

const ChannelHeader = ({ account, showUnderLine = true }: Props) => {
	const { colorScheme } = useColorScheme();
	return (
		<View>
			<View className="flex flex-row items-center mx-6">
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
				<Pressable className="p-3 border border-slate-200 rounded-full active:opacity-80 mr-2">
					<AddCommunityIcon colorScheme={colorScheme} />
				</Pressable>
				<Pressable className="p-3 border border-slate-200 rounded-full active:opacity-80">
					<SettingIcon colorScheme={colorScheme} />
				</Pressable>
			</View>
			{showUnderLine && <Underline className="mt-2" />}
		</View>
	);
};

export default ChannelHeader;
