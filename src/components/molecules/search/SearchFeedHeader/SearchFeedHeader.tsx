import Underline from '@/components/atoms/common/Underline/Underline';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { AddCommunityIcon, SearchIcon, SettingIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { View, ImageProps, Image, Pressable } from 'react-native';
import TextInput from '@/components/atoms/common/TextInput/TextInput';

type Props = {
	account: Pathchwork.Account;
	showUnderLine?: boolean;
};

const SearchFeedHeader = ({ account, showUnderLine = true }: Props) => {
	const { colorScheme } = useColorScheme();
	return (
		<View>
			<View className="flex flex-row items-center mx-6">
				<Image
					source={account.avatar as ImageProps}
					className="w-[60] h-[60] rounded-full"
				/>
				<View className="flex flex-1 mx-3">
					<ThemeText className="font-bold" size="lg_18">
						Search
					</ThemeText>
					
				</View>
                {/* SearchInput */}
				
			</View>
			<TextInput
					placeholder="Search ..."
					styleNW="h-11 mt-5 mb-2 mx-6"
					startIcon={<SearchIcon />}
				/>
			{showUnderLine && <Underline className="mt-2" />}
		</View>
	);
};

export default SearchFeedHeader;
