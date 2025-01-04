import { queryClient } from '@/App';
import { useActiveConversationStore } from '@/store/conversation/activeConversationStore';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { log } from 'console';
import dayjs from 'dayjs';
import moment from 'moment';
import Sound from 'react-native-sound';
import { cleanText } from './cleanText';
import { extractMessage } from './extractMessage';

export const isMsgTimeClose = (
	message: Patchwork.Status,
	prevMessage: Patchwork.Status | undefined,
) => {
	if (!prevMessage) return true;
	return (
		Math.abs(
			dayjs(message.created_at).diff(dayjs(prevMessage.created_at), 'minute'),
		) < 60
	);
};

export const formatMessageDate = (createdAt: string): string => {
	const date = moment(createdAt);
	const now = moment();

	if (date.isSame(now, 'day')) {
		return `Today ${date.format('h:mm A')}`;
	}

	if (date.isSame(now.clone().subtract(1, 'day'), 'day')) {
		return `Yesterday ${date.format('h:mm A')}`;
	}

	if (date.isSame(now, 'week')) {
		return `${date.format('dddd h:mm A')}`;
	}

	return `${date.format('MMM D, h:mm A')}`;
};

export function formatMessageSentTime(timestamp: string | Date): string {
	return moment(timestamp).format('h:mm A');
}

export const generateTWClassForImageSize = (
	totalImage: number,
	currentImageIdx: number,
) => {
	if (totalImage == 2) {
		return ` ${
			currentImageIdx == 0
				? 'rounded-tl-xl border-r rounded-br-xl'
				: 'rounded-tr-xl rounded-br-xl'
		}`;
	}
	if (totalImage == 3) {
		return ` ${currentImageIdx == 0 && 'w-full rounded-tl-xl rounded-br-xl'}`;
	}
};

export const handleIncommingMessage = async (
	notiResp: FirebaseMessagingTypes.RemoteMessage,
) => {
	const activeConvState = useActiveConversationStore.getState();

	if (activeConvState.activeConversation) {
		await queryClient.invalidateQueries({
			queryKey: [
				'message-list',
				{ id: activeConvState.activeConversation?.last_status.id },
			],
		});
		// return playSound('receive');
	}

	await queryClient.invalidateQueries({ queryKey: ['conversations'] });
	// playSound();
};

type SoundType = 'noti' | 'send' | 'receive';
// export const playSound = (soundType: SoundType = 'noti') => {
// 	const soundMap = {
// 		noti: require('../../../assets/sound/notisound.wav'),
// 		send: require('../../../assets/sound/message_send.wav'),
// 		receive: require('../../../assets/sound/message_receive.wav'),
// 	};
// 	const soundPath = soundMap[soundType];
// 	const sound = new Sound(soundPath, error => {
// 		if (error) {
// 			console.log('Failed to load the sound', error);
// 			return;
// 		}
// 		sound.play(() => sound.release());
// 	});
// };

export const checkIsConversationNoti = (
	notiResp: FirebaseMessagingTypes.RemoteMessage,
) => {
	return (
		notiResp.data?.noti_type == 'mention' &&
		notiResp.data?.visibility == 'direct'
	);
};

export const getCurrentTotalMessageListAtPageEntry = (
	isFromNotification: boolean | undefined,
	lastMsgId: string,
) => {
	if (isFromNotification) {
		const messages = queryClient.getQueryData<Patchwork.TimelineReplies>([
			'message-list',
			{ id: lastMsgId },
		]);
		const totalMessageList = messages
			? [...messages?.descendants, ...messages?.ancestors]
			: [];
		return totalMessageList;
	}
	return [];
};

export const isFromNotificationMatch = (
	conversation: Patchwork.Conversations,
	totalMsgList: Patchwork.Status[],
) => totalMsgList.some(message => message.id === conversation.last_status?.id);

export const findMatchingStatus = (
	statusId: string,
	totalMsgList: Patchwork.Status[],
): Patchwork.Status | undefined =>
	totalMsgList.find(message => message.id === statusId);
