import { Search, SearchResults } from '@/screens';
import { SearchStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<SearchStackParamList>();

const SearchStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="SearchFeed" component={Search} />
			<Stack.Screen name="SearchResults" component={SearchResults} />
		</Stack.Navigator>
	);
};

export default SearchStack;
