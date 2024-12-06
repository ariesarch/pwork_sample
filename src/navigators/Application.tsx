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
	LocalImageViewer,
} from '@/screens';

import type { RootStackParamList } from '@/types/navigation';
import BottomTabs from './BottomTabStackNavigator';
import WebViewer from '@/screens/WebViewer/WebViewer';
import { useAuthStore, useAuthStoreAction } from '@/store/auth/authStore';
import { useEffect } from 'react';
import Guest from './GuestStackNavigator';
import { getAppToken } from '@/util/helper/helper';
import EditProfile from '@/screens/EditProfile/EditProfile';

const Stack = createStackNavigator<RootStackParamList>();

const CustomTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: '#2E363B',
	},
};

function ApplicationNavigator() {
	const { access_token } = useAuthStore();
	const ENTRY_ROUTE = access_token ? 'Index' : 'Guest';

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={CustomTheme}>
				<Stack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName={ENTRY_ROUTE}
				>
					{!access_token ? (
						<>
							<Stack.Screen name="Guest" component={Guest} />
						</>
					) : (
						<>
							<Stack.Screen name="Index" component={BottomTabs} />
							<Stack.Screen name="AboutYou" component={AboutYou} />
							<Stack.Screen name="Profile" component={Profile} />
							<Stack.Screen name="ChannelCreate" component={ChannelCreate} />
							<Stack.Screen
								name="EmailVerification"
								component={EmailVerification}
							/>
							<Stack.Screen name="WebViewer" component={WebViewer} />
							<Stack.Screen name="ImageViewer" component={ImageViewer} />
							<Stack.Screen name="EditProfile" component={EditProfile} />
							<Stack.Screen
								name="LocalImageViewer"
								component={LocalImageViewer}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
