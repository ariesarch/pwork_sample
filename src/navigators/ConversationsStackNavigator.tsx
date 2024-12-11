import { ConversationsStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NewMessage, ConversationDetail, ConversationList } from '@/screens';

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
		</Stack.Navigator>
	);
};

export default ConversationsStack;
