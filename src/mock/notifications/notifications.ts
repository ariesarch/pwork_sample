export type NotificationData = {
	id: string;
	type: string;
	text: string;
	hashtag?: string;
	timestamp: string;
};

export const notifications: NotificationData[] = [
	{
		id: '1',
		type: 'like',
		text: 'Someone liked your post',
		hashtag: '#tag Check this out',
		timestamp: '3 sec ago',
	},
	{
		id: '2',
		type: 'comment',
		text: 'New comment from Someone',
		hashtag: '#tag Check this out',
		timestamp: '1 min ago',
	},
	{
		id: '3',
		type: 're-shared',
		text: 'Your post was re-shared by Someone',
		hashtag: '#tag Check this out',
		timestamp: '1h ago',
	},
	{
		id: '4',
		type: 'followed',
		text: 'You were followed by Someone',
		timestamp: '3h ago',
	},
	{
		id: '5',
		type: 'like',
		text: 'Someone, Someone and 32 more liked your post',
		hashtag: '#tag Check this out',
		timestamp: '1d ago',
	},
];
