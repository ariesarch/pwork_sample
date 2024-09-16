import PeopleRelatedLists from '@/components/molecules/search/PeopleRelated/PeopleRelatedLists';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import { mockSearchResultsList } from '@/mock/search/searchResultsList';
import { View, FlatList } from 'react-native';

const SearchResultsList = () => {
	return (
		<View>
			<FlatList
				data={mockSearchResultsList}
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				ListHeaderComponent={() => <PeopleRelatedLists />}
				renderItem={({ item }) => <StatusItem status={item} />}
			/>
		</View>
	);
};

export default SearchResultsList;
