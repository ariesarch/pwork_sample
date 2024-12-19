import { ConversationsStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import {
	NewMessage,
	ConversationDetail,
	ConversationList,
	NotificationRequests,
} from '@/screens';
import InitiateNewConversation from '@/screens/InitiateNewConversation/InitiateNewConversation';

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
		</Stack.Navigator>
	);
};

export default ConversationsStack;
