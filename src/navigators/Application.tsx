import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
	Login,
	Register,
	Welcome,
	AboutYou,
	Profile,
	EmailVerification,
	ChannelCreate,
	ChannelProfile,
} from '@/screens';

import type { RootStackParamList } from '@/types/navigation';
import BottomTabs from './BottomTabStackNavigator';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Welcome" component={Welcome} />
					<Stack.Screen name="Register" component={Register} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="AboutYou" component={AboutYou} />
					<Stack.Screen name="Profile" component={Profile} />
					<Stack.Screen name="Index" component={BottomTabs} />
					<Stack.Screen name="ChannelCreate" component={ChannelCreate} />
					<Stack.Screen name="ChannelProfile" component={ChannelProfile} />
					<Stack.Screen
						name="EmailVerification"
						component={EmailVerification}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
