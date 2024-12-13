import messaging, {
	FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { DeviceEventEmitter, PermissionsAndroid, Platform } from 'react-native';
import notifee, {
	AndroidImportance,
	Notification,
} from '@notifee/react-native';
import { usePushNoticationStore } from '@/store/pushNoti/pushNotiStore';
import navigationRef from '../navigation/navigationRef';
import { CommonActions } from '@react-navigation/native';

/**
 * Function to request notification permissions for Android.
 **/
const requestAndroidPermission = async () => {
	const granted = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
	);
	if (granted === PermissionsAndroid.RESULTS.GRANTED) {
		return await getFirebaseMessagingToken();
	} else {
		const saveFcmToken = usePushNoticationStore.getState().actions.saveFcmToken;
		return saveFcmToken(null);
	}
};

/**
 * Function to request notification permissions for IOS.
 **/
const requestIOSPermission = async () => {
	const authStatus = await messaging().requestPermission();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		return await getFirebaseMessagingToken();
	} else {
		const saveFcmToken = usePushNoticationStore.getState().actions.saveFcmToken;
		return saveFcmToken(null);
	}
};

/**
 * Function to request notification permissions for both iOS and Android.
 **/
const requestNotificationPermission = async () => {
	if (Platform.OS === 'ios') {
		await requestIOSPermission();
	} else if (Platform.OS === 'android') {
		await requestAndroidPermission();
	}
};

/**
 * Function to get the FCM token for devices.
 **/
const getFirebaseMessagingToken = async () => {
	try {
		const saveFcmToken = usePushNoticationStore.getState().actions.saveFcmToken;

		const delay = (ms: number | undefined) =>
			new Promise(res => setTimeout(res, ms));
		await delay(1000);

		return saveFcmToken(await messaging().getToken());
	} catch (error) {
		console.log('🚀 ~ getFirebaseMessagingToken ~ error:', error);
	}
};

export const AndroidMessageChannelId = 'Patchwork';

if (Platform.OS === 'android') {
	notifee.createChannel({
		id: AndroidMessageChannelId,
		name: 'Patchwork',
		sound: 'default',
		importance: AndroidImportance.HIGH,
	});
}

const listenMessage = () => {
	const onSetNotifcationCount =
		usePushNoticationStore.getState().actions.onSetNotifcationCount;
	return messaging().onMessage(async remoteMessage => {
		onSetNotifcationCount();
		await showNotification(remoteMessage.notification);
		DeviceEventEmitter.emit('patchwork.noti', remoteMessage);
	});
};

const showNotification = async (
	notification: FirebaseMessagingTypes.Notification | Notification | undefined,
) => {
	await notifee.displayNotification({
		...notification,
		android: {
			channelId: AndroidMessageChannelId,
		},
		ios: {
			sound: 'default',
		},
	});
};

const handleNotiDetailPress = (destinationId: string) => {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [
					{
						name: 'Notification',
						state: {
							routes: [
								{ name: 'NotificationList' },
								{
									name: 'FeedDetail',
									params: { id: destinationId },
								},
							],
						},
					},
				],
			}),
		);
	}
};

const handleNotiProfileDetailPress = (destinationId: string) => {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [
					{
						name: 'Notification',
						state: {
							routes: [
								{ name: 'NotificationList' },
								{
									name: 'ProfileOther',
									params: { id: destinationId },
								},
							],
						},
					},
				],
			}),
		);
	}
};

export {
	requestNotificationPermission,
	listenMessage,
	handleNotiDetailPress,
	handleNotiProfileDetailPress,
	showNotification,
};
