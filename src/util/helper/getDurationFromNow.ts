import moment from 'moment';

export function getDurationFromNow(timestamp: string): string {
	const now = moment();
	const givenTime = moment(timestamp);
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
