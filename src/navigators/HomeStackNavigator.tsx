import {
	PeopleFollowing,
	ChannelProfile,
	FeedDetail,
	HomeFeed,
	Profile,
	HashTagDetail,
	FollowingAccounts,
	FollowerAccounts,
} from '@/screens';
import ProfileOther from '@/screens/ProfileOther/ProfileOther';
import { HomeStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import ConversationsStack from './ConversationsStackNavigator';
import SearchStack from './SearchStackNavigator';
import Settings from '@/screens/Settings/Settings';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeFeed" component={HomeFeed} />
			<Stack.Screen name="PeopleFollowing" component={PeopleFollowing} />
			<Stack.Screen name="ChannelProfile" component={ChannelProfile} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="ProfileOther" component={ProfileOther} />
			<Stack.Screen name="FollowingAccounts" component={FollowingAccounts} />
			<Stack.Screen name="FollowerAccounts" component={FollowerAccounts} />
			<Stack.Screen name="FeedDetail" component={FeedDetail} />
			<Stack.Screen name="HashTagDetail" component={HashTagDetail} />
			<Stack.Screen name="Conversations" component={ConversationsStack} />
			<Stack.Screen name="Settings" component={Settings} />
		</Stack.Navigator>
	);
};

export default HomeStack;
