import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export type RootStackParamList = {
	MockScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
type Props = {
	children: React.ReactElement;
};

function StroyNavigator({ children }: Props) {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="MockScreen">{() => children}</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default StroyNavigator;
