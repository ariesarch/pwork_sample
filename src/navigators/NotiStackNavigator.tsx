import { NotiStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { Notification, FeedDetail } from '@/screens';

const Stack = createStackNavigator<NotiStackParamList>();

const NotiStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="NotificationList"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="NotificationList" component={Notification} />
			<Stack.Screen name="FeedDetail" component={FeedDetail} />
		</Stack.Navigator>
	);
};

export default NotiStack;
