import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
	Login,
	Register,
	Welcome,
	AboutYou,
	HomeFeed,
	Profile,
	Channel,
	ChannelDetail,
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
					<Stack.Screen name="ChannelDetail" component={ChannelDetail} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
