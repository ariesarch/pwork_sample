import { NotiStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { Notification, FeedDetail, Profile } from '@/screens';
import ProfileOther from '@/screens/ProfileOther/ProfileOther';

const Stack = createStackNavigator<NotiStackParamList>();

const NotiStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="NotificationList"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="NotificationList" component={Notification} />
			<Stack.Screen name="FeedDetail" component={FeedDetail} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="ProfileOther" component={ProfileOther} />
		</Stack.Navigator>
	);
};

export default NotiStack;
