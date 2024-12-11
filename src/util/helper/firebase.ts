import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { usePushNoticationStore } from '@/store/pushNoti/pushNotiStore';

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

export { requestNotificationPermission, getFirebaseMessagingToken };
