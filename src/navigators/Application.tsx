import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
	Login,
	Register,
	Welcome,
	AboutYou,
	Profile,
	EmailVerification,
	ChannelCreate,
	ImageViewer,
} from '@/screens';

import type { RootStackParamList } from '@/types/navigation';
import BottomTabs from './BottomTabStackNavigator';
import WebViewer from '@/screens/WebViewer/WebViewer';

const Stack = createStackNavigator<RootStackParamList>();

const CustomTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: '#2E363B',
	},
};

function ApplicationNavigator() {
	return (
		<SafeAreaProvider>
			<NavigationContainer theme={CustomTheme}>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Welcome" component={Welcome} />
					<Stack.Screen name="Register" component={Register} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="AboutYou" component={AboutYou} />
					<Stack.Screen name="Profile" component={Profile} />
					<Stack.Screen name="Index" component={BottomTabs} />
					<Stack.Screen name="ChannelCreate" component={ChannelCreate} />
					<Stack.Screen
						name="EmailVerification"
						component={EmailVerification}
					/>
					<Stack.Screen name="WebViewer" component={WebViewer} />
					<Stack.Screen name="ImageViewer" component={ImageViewer} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
