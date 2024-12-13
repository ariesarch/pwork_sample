import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
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
import { useAuthStore } from '@/store/auth/authStore';
import Guest from './GuestStackNavigator';
import EditProfile from '@/screens/EditProfile/EditProfile';
import ProfileOther from '@/screens/ProfileOther/ProfileOther';
import { useEffect } from 'react';
import {
	handleNotiDetailPress,
	handleNotiProfileDetailPress,
	listenMessage,
	requestNotificationPermission,
} from '@/util/helper/firebase';
import { DeviceEventEmitter } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import { NotificationsQueryKey } from '@/services/notification.service';
import { queryClient } from '@/App';
import { usePushNoticationActions } from '@/store/pushNoti/pushNotiStore';
import navigationRef from '@/util/navigation/navigationRef';
import messaging from '@react-native-firebase/messaging';

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
	const { onRemoveNotifcationCount, onSetNotifcationCount } =
		usePushNoticationActions();

	// ***** Listening for foreground and background messages ***** //
	useEffect(() => {
		messaging().setBackgroundMessageHandler(async _ => {
			onSetNotifcationCount();
		});

		const unsubscribe = listenMessage();
		return unsubscribe;
	}, []);
	// ***** Listening for foreground and background messages ***** //

	// ***** This method will be triggered if the app is already opened. ( Start ) ***** //
	useEffect(() => {
		const eventEmitter = DeviceEventEmitter.addListener(
			'patchwork.noti',
			val => {
				const notiQueryKey: NotificationsQueryKey = ['noti-query-key'];
				return notifee.onForegroundEvent(({ type }) => {
					queryClient.invalidateQueries({ queryKey: notiQueryKey });
					switch (type) {
						case EventType.DISMISSED:
							break;
						case EventType.PRESS:
							onRemoveNotifcationCount();
							const destinationId = val.data?.destination_id;
							if (val.data.noti_type === 'follow') {
								handleNotiProfileDetailPress(destinationId);
							} else {
								handleNotiDetailPress(destinationId);
							}
							break;
					}
				});
			},
		);
		return () => eventEmitter.remove();
	}, []);
	// ***** This method will be triggered if the app is already opened. ( End ) ***** //

	useEffect(() => {
		// ***** This method will be triggered if the app has opened from a background state. ***** //
		messaging().onNotificationOpenedApp(remoteMessage => {
			onRemoveNotifcationCount();
			if (remoteMessage?.data) {
				const { noti_type, destination_id } = remoteMessage.data;
				if (noti_type === 'follow') {
					handleNotiProfileDetailPress(destination_id as string);
				} else {
					handleNotiDetailPress(destination_id as string);
				}
			}
		});

		// ***** This method will be triggered the application to open from a quit state. ***** //
		messaging()
			.getInitialNotification()
			.then(remoteMessage => {
				// console.log('🚀 ~ useEffect ~ getInitialNotification:', remoteMessage);
				onRemoveNotifcationCount();
				if (remoteMessage?.data) {
					const { noti_type, destination_id } = remoteMessage.data;
					if (noti_type === 'follow') {
						setTimeout(() => {
							handleNotiProfileDetailPress(destination_id as string);
						}, 1000);
					} else {
						setTimeout(() => {
							handleNotiDetailPress(destination_id as string);
						}, 1000);
					}
				}
			});
	}, []);

	// ***** Firebase Request Noti Permission ***** //
	useEffect(() => {
		(() => {
			setTimeout(async () => {
				access_token && (await requestNotificationPermission());
			}, 1000);
		})();
	}, [access_token]);
	// ***** Firebase Request Noti Permission ***** //

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={CustomTheme} ref={navigationRef}>
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
							<Stack.Screen name="ProfileOther" component={ProfileOther} />
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
