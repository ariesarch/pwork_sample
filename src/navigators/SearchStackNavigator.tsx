import { ChannelProfile, FeedDetail, Search, SearchResults } from '@/screens';
import { SearchStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<SearchStackParamList>();

const SearchStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="SearchFeed" component={Search} />
			<Stack.Screen name="SearchResults" component={SearchResults} />
			<Stack.Screen name="ChannelProfile" component={ChannelProfile} />
			<Stack.Screen name="FeedDetail" component={FeedDetail} />
		</Stack.Navigator>
	);
};

export default SearchStack;
