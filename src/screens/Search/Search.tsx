import SearchFeedHeader from '@/components/molecules/search/SearchFeedHeader/SearchFeedHeader';
import Trending from '@/components/molecules/search/Trending/Trending';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { mockUserList } from '@/mock/feed/statusList';
import { HomeStackScreenProps } from '@/types/navigation';
import { useColorScheme } from 'nativewind';
import { View, Text, ScrollView } from 'react-native';
import ChannelProfile from '../ChannelProfile/ChannelProfile';
import SearchChannelHeader from '../SearchChannel/SearchChannelHeader';
import SearchEverything from '@/components/organisms/search/Everything/SearchEverything';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import SearchChannels from '@/components/organisms/search/Channel/SearchChannels';

const Search = ({ navigation }: HomeStackScreenProps<'Search'>) => {
	const { colorScheme } = useColorScheme();

	return (
		<SafeScreen>
			{/* <Text>Search Screen</Text> */}
			<SearchFeedHeader account={mockUserList[0]} showUnderLine={true} />

			<ScrollView showsVerticalScrollIndicator={false}>
				<SearchChannelHeader />
				
			</ScrollView>
		</SafeScreen>
	);
};

export default Search;
