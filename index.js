/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';
import { name as appName } from './app.json';

if (__DEV__) {
	import('@/reactotron.config');
}

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
	console.log('Message handled in the background!', remoteMessage);
	// DeviceEventEmitter.emit('patchwork.noti', remoteMessage);
	// await showNotification(remoteMessage);
});

// Handle background notification events
// notifee.onBackgroundEvent(async ({ type, detail }) => {
// 	const { notification, pressAction } = detail;
// 	console.log('🚀 ~ notifee.onBackgroundEvent ~ type:', type);
// 	console.log('🚀 ~ notifee.onBackgroundEvent ~ detail:', detail);
// 	console.log('🚀 ~ notifee.onBackgroundEvent ~ notification:', notification);
// 	// Check if the user pressed the "Mark as read" action
// 	if (type === EventType.PRESS) {
// 		console.log('leee bal.');
// 		// handleNotiDetailPress(destinationId);
// 		await notifee.cancelNotification(notification.id);
// 	}
// });
AppRegistry.registerComponent(appName, () => App);
