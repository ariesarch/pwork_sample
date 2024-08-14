import {
	PeopleFollowing,
	ChannelProfile,
	FeedDetail,
	HomeFeed,
	Profile,
	EmptySearch,
	SearchResults,
} from '@/screens';
import { HomeStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeFeed" component={HomeFeed} />
			<Stack.Screen name="PeopleFollowing" component={PeopleFollowing} />
			<Stack.Screen name="ChannelProfile" component={ChannelProfile} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="FeedDetail" component={FeedDetail} />
			<Stack.Screen name="SearchResults" component={SearchResults} />
		</Stack.Navigator>
	);
};

export default HomeStack;
