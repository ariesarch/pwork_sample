import { queryClient } from '@/App';
import { useActiveConversationStore } from '@/store/conversation/activeConversationStore';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import dayjs from 'dayjs';
import moment from 'moment';

export const isMsgTimeClose = (
	message: Pathchwork.Status,
	prevMessage: Pathchwork.Status | undefined,
) => {
	if (!prevMessage) return false;
	return (
		dayjs(message.created_at).diff(dayjs(prevMessage.created_at), 'minute') < 60
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

export const handleIncommingMessage = (
	notiResp: FirebaseMessagingTypes.RemoteMessage,
) => {
	console.log('noti_type::', notiResp.data?.noti_type);
	if (notiResp.data?.noti_type !== 'mention') return;
	const activeConvState = useActiveConversationStore.getState();

	if (activeConvState) {
		console.log('aa::', activeConvState);
		queryClient.invalidateQueries({
			queryKey: [
				'message-list',
				{ id: activeConvState.activeConversation?.last_status.id },
			],
		});
	}
	console.log('bb::');
	queryClient.invalidateQueries({ queryKey: ['conversations'] });
};
