import {
	PeopleFollowing,
	ChannelProfile,
	FeedDetail,
	HomeFeed,
	Profile,
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
		</Stack.Navigator>
	);
};

export default HomeStack;
