import { GuestStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome, Register, Login } from '@/screens';
import ForgotPassword from '@/screens/ForgotPassword/ForgotPassword';
import ForgotPasswordOTP from '@/screens/ForgotPasswordOTP/ForgotPasswordOTP';
import ChangePassword from '@/screens/ChangePassword/ChangePassword';

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
			<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
			<Stack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTP} />
			<Stack.Screen name="ChangePassword" component={ChangePassword} />
		</Stack.Navigator>
	);
};

export default Guest;
