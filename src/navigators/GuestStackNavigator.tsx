import { GuestStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome, Register, Login } from '@/screens';

const Stack = createStackNavigator<GuestStackParamList>();

const Guest = () => {
	return (
		<Stack.Navigator
			initialRouteName="Welcome"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Welcome" component={Welcome} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
};

export default Guest;
