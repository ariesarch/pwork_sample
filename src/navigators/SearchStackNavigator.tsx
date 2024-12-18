import {
	ChannelProfile,
	CollectionDetail,
	FeedDetail,
	Profile,
	Search,
	SearchResults,
} from '@/screens';
import ProfileOther from '@/screens/ProfileOther/ProfileOther';
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
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="ProfileOther" component={ProfileOther} />
			<Stack.Screen name="CollectionDetail" component={CollectionDetail} />
		</Stack.Navigator>
	);
};

export default SearchStack;
