import { ConversationsStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NewMessage, Chat, StartConversation } from '@/screens';

const Stack = createStackNavigator<ConversationsStackParamList>();

const ConversationsStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="StartConversation"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="StartConversation" component={StartConversation} />
			<Stack.Screen name="NewMessage" component={NewMessage} />
			<Stack.Screen name="Chat" component={Chat} />
		</Stack.Navigator>
	);
};

export default ConversationsStack;
