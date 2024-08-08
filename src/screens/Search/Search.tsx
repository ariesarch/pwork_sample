import SearchChannelHeader from '@/components/molecules/search/SearchChannel/SearchChannelHeader';
import SearchFeedHeader from '@/components/molecules/search/SearchFeedHeader/SearchFeedHeader';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { mockUserList } from '@/mock/feed/statusList';
import { TabBarScreenProps } from '@/types/navigation';
import { useColorScheme } from 'nativewind';
const Search = ({ navigation }: TabBarScreenProps<'Search'>) => {
	const { colorScheme } = useColorScheme();

	return (
		<SafeScreen>
			<SearchFeedHeader account={mockUserList[0]} showUnderLine={true} />
			<SearchChannelHeader />
		</SafeScreen>
	);
};

export default Search;
