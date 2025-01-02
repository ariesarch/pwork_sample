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
	BookmarkList,
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
	handleNotiFollowRequestPress,
	handleNotiProfileDetailPress,
	listenMessage,
	requestNotificationPermission,
} from '@/util/helper/firebase';
import notifee, { EventType } from '@notifee/react-native';
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
		const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
			const { notification } = detail;
			switch (type) {
				case EventType.DISMISSED:
					onRemoveNotifcationCount();
					break;
				case EventType.PRESS:
					onRemoveNotifcationCount();
					if (notification?.data) {
						const notiResp =
							notification?.data as Pathchwork.PushNotiResponse['data'];
						if (notification?.data?.noti_type === 'follow') {
							handleNotiProfileDetailPress(notiResp?.destination_id);
						} else if (notification?.data?.noti_type === 'follow_request') {
							handleNotiFollowRequestPress();
						} else {
							handleNotiDetailPress(notiResp);
						}
					}
					break;
			}
		});

		return unsubscribe;
	}, []);
	// ***** This method will be triggered if the app is already opened. ( End ) ***** //

	useEffect(() => {
		// ***** This method will be triggered if the app has opened from a background state. ***** //
		messaging().onNotificationOpenedApp(remoteMessage => {
			onRemoveNotifcationCount();
			if (remoteMessage?.data) {
				const notiResp =
					remoteMessage?.data as Pathchwork.PushNotiResponse['data'];
				if (notiResp.noti_type === 'follow') {
					handleNotiProfileDetailPress(notiResp.destination_id as string);
				} else if (notiResp.noti_type === 'follow_request') {
					handleNotiFollowRequestPress();
				} else {
					handleNotiDetailPress(notiResp);
				}
			}
		});

		// ***** This method will be triggered the application to open from a quit state. ***** //
		messaging()
			.getInitialNotification()
			.then(remoteMessage => {
				onRemoveNotifcationCount();
				if (remoteMessage?.data) {
					// const { noti_type, destination_id, reblogged_id } =
					// 	remoteMessage.data;
					const notiResp =
						remoteMessage.data as Pathchwork.PushNotiResponse['data'];
					if (notiResp.noti_type === 'follow') {
						setTimeout(() => {
							handleNotiProfileDetailPress(notiResp.destination_id);
						}, 1000);
					} else if (notiResp.noti_type === 'follow_request') {
						setTimeout(() => {
							handleNotiFollowRequestPress();
						}, 1000);
					} else {
						setTimeout(() => {
							handleNotiDetailPress(notiResp);
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
							<Stack.Screen name="BookmarkList" component={BookmarkList} />
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
