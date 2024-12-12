import moment from 'moment';
import { handleError } from './helper';

export function getDurationFromNow(timestamp: string): string {
	const now = moment();
	const givenTime = moment(timestamp);

	if (!givenTime.isValid()) {
		handleError('Invalid timestamp format');
	}

	if (givenTime.isAfter(now)) {
		return 'in the future';
	}

	const diffInSeconds = now.diff(givenTime, 'seconds');

	if (diffInSeconds < 60) {
		return `${diffInSeconds}s`;
	} else if (diffInSeconds < 3600) {
		const diffInMinutes = now.diff(givenTime, 'minutes');
		return `${diffInMinutes}m`;
	} else if (diffInSeconds < 86400) {
		const diffInHours = now.diff(givenTime, 'hours');
		return `${diffInHours}h`;
	} else {
		const diffInDays = now.diff(givenTime, 'days');
		return `${diffInDays}d`;
	}
}
