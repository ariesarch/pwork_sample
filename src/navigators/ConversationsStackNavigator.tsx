import { ConversationsStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import {
	NewMessage,
	ConversationDetail,
	ConversationList,
	NotificationRequests,
	Profile,
	FollowingAccounts,
	FollowerAccounts,
} from '@/screens';
import InitiateNewConversation from '@/screens/InitiateNewConversation/InitiateNewConversation';
import ProfileOther from '@/screens/ProfileOther/ProfileOther';

const Stack = createStackNavigator<ConversationsStackParamList>();

const ConversationsStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="ConversationList"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="ConversationList" component={ConversationList} />
			<Stack.Screen name="NewMessage" component={NewMessage} />
			<Stack.Screen name="ConversationDetail" component={ConversationDetail} />
			<Stack.Screen
				name="InitiateNewConversation"
				component={InitiateNewConversation}
			/>
			<Stack.Screen
				name="NotificationRequests"
				component={NotificationRequests}
			/>
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="ProfileOther" component={ProfileOther} />
			<Stack.Screen name="FollowingAccounts" component={FollowingAccounts} />
			<Stack.Screen name="FollowerAccounts" component={FollowerAccounts} />
		</Stack.Navigator>
	);
};

export default ConversationsStack;
