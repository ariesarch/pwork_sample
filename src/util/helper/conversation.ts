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
