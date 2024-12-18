import Toast from 'react-native-toast-message';

export function validateMsgText(status: string) {
	const payloadText = status.trim();

	const mentionedUserRegex = /@\w+@\w+\.\w+/;
	const hashtagRegex = /#\w+/;

	const mentionedUser = payloadText.match(mentionedUserRegex)?.[0];
	const hashtag = payloadText.match(hashtagRegex)?.[0];

	const messageText = payloadText
		.replace(mentionedUser || '', '')
		.replace(hashtag || '', '')
		.trim();

	if (!mentionedUser) {
		Toast.show({
			type: 'info',
			position: 'top',
			text1: 'Error',
			text2: 'Please mention a user.',
			visibilityTime: 3000,
		});
		return false;
	}

	if (!messageText) {
		Toast.show({
			type: 'info',
			position: 'top',
			text1: 'Warning',
			text2: 'Please write a message.',
			visibilityTime: 3000,
		});
		return false;
	}

	return true;
}
