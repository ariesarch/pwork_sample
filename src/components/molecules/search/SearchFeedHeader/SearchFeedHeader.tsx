import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { SearchIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { Pressable, View } from 'react-native';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import FastImage from 'react-native-fast-image';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchStackParamList } from '@/types/navigation';
import { useActiveDomainAction } from '@/store/feed/activeDomain';

type Props = {
	navigation: StackNavigationProp<
		SearchStackParamList,
		'SearchFeed',
		undefined
	>;
	account: Patchwork.Account;
	showUnderLine?: boolean;
};

const SearchFeedHeader = ({
	navigation,
	account,
	showUnderLine = true,
}: Props) => {
	const { colorScheme } = useColorScheme();
	const { setDomain } = useActiveDomainAction();

	return (
		<View>
			<View className="flex flex-row items-center mx-6 mt-4">
				<Pressable
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
				</Pressable>

				<View className="flex flex-1 mx-3">
					<ThemeText className="font-SourceSans3_Bold" size="lg_18">
						Search
					</ThemeText>
				</View>
				{/* SearchInput */}
			</View>
			<TextInput
				placeholder="Search ..."
				extraContainerStyle="h-11 w-100 mt-5 mb-2 mx-6"
				startIcon={<SearchIcon />}
				onPress={() => navigation.navigate('SearchResults')}
			/>
			{/* {showUnderLine && <Underline className="mt-2" />} */}
		</View>
	);
};

export default SearchFeedHeader;
