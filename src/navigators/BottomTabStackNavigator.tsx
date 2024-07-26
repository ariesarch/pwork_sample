/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { Compose, Message, Notification, Search } from '@/screens';
import { BottomStackParamList } from '@/types/navigation';
import {
	ComposeTabIcon,
	HomeTabIcon,
	MessageTabIcon,
	NotificationTabIcon,
	SearchTabIcon,
} from '@/util/svg/icon.common';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import HomeStack from './HomeStackNavigator';

const Tab = createBottomTabNavigator<BottomStackParamList>();

export default function BottomTabs() {
	const { colorScheme } = useColorScheme();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					backgroundColor: colorScheme === 'dark' ? '#2E363B' : '#fff',
					height: 65,
					// borderTopWidth: 1,
					// borderTopColor: colorScheme === 'dark' ? '#585e62' : '#fefefe',
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeStack}
				options={{
					tabBarIcon: ({ focused }) => (
						<HomeTabIcon colorScheme={colorScheme} focused={focused} />
					),
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ focused }) => (
						<SearchTabIcon colorScheme={colorScheme} focused={focused} />
					),
				}}
			/>
			<Tab.Screen
				name="Compose"
				component={Compose}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								padding: 10,
								backgroundColor: colorScheme === 'dark' ? '#444A4F' : '#333',
								borderRadius: 10,
							}}
						>
							<ComposeTabIcon
								colorScheme={colorScheme}
								width={focused ? 20 : 17}
								height={focused ? 20 : 17}
								focused={focused}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Notification"
				component={Notification}
				options={{
					tabBarIcon: ({ focused }) => (
						<NotificationTabIcon colorScheme={colorScheme} focused={focused} />
					),
				}}
			/>
			<Tab.Screen
				name="Message"
				component={Message}
				options={{
					tabBarIcon: ({ focused }) => (
						<MessageTabIcon colorScheme={colorScheme} focused={focused} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
