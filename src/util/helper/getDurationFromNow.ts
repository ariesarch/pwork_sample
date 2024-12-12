import moment from 'moment';
import { handleError } from './helper';

export function getDurationFromNow(timestamp: string): string {
	const now = moment();
	let givenTime = moment(timestamp);

	if (!givenTime.isValid()) {
		handleError('Invalid timestamp format');
	}

	let diffInSeconds = now.diff(givenTime, 'seconds');

	// Note: Added an extra sec to future timestamp to align with query cache updates
	if (givenTime.isAfter(now)) {
		const adjustedTime = givenTime.add(1, 'seconds');
		diffInSeconds = adjustedTime.diff(now, 'seconds');
	}

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
