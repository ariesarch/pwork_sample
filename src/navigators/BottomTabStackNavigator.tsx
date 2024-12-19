import { Compose } from '@/screens';
import { BottomStackParamList } from '@/types/navigation';
import {
	ComposeTabIcon,
	HomeTabIcon,
	SearchTabIcon,
} from '@/util/svg/icon.common';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'nativewind';
import { Platform, View } from 'react-native';
import HomeStack from './HomeStackNavigator';
import SearchStack from './SearchStackNavigator';
import ConversationsStack from './ConversationsStackNavigator';
import NotiStack from './NotiStackNavigator';
import {
	usePushNoticationActions,
	usePushNoticationStore,
} from '@/store/pushNoti/pushNotiStore';
import NotiTabBarIcon from '@/components/atoms/notifications/NotiTabBarIcon/NotiTabBarIcon';
import ConversationsTabButton from '@/components/atoms/conversations/ConversationsTabButton/ConversationsTabButton';

const Tab = createBottomTabNavigator<BottomStackParamList>();

export default function BottomTabs() {
	const { colorScheme } = useColorScheme();
	const notiCount = usePushNoticationStore(state => state.notiCount);
	const { onRemoveNotifcationCount } = usePushNoticationActions();
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: colorScheme === 'dark' ? '#2E363B' : '#fff',
					height: Platform.OS == 'ios' ? 100 : 70,
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
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault();
						navigation.navigate('Home', {
							screen: 'HomeFeed',
						});
					},
				})}
			/>
			<Tab.Screen
				name="Search"
				component={SearchStack}
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
					tabBarStyle: { display: 'none' },
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
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault();
						navigation.navigate('Compose', { type: 'create' });
					},
				})}
			/>
			<Tab.Screen
				name="Notification"
				component={NotiStack}
				options={{
					tabBarIcon: ({ focused }) => (
						<NotiTabBarIcon {...{ colorScheme, focused, notiCount }} />
					),
				}}
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault();
						notiCount !== 0 && onRemoveNotifcationCount();
						navigation.navigate('Notification', {
							screen: 'NotificationList',
							params: {
								tabIndex: 0,
							},
						});
					},
				})}
			/>
			<Tab.Screen
				name="Conversations"
				component={ConversationsStack}
				options={{
					tabBarIcon: ({ focused }) => (
						<ConversationsTabButton focused={focused} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
