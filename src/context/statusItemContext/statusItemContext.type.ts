export type StatusCurrentPage =
	| 'Channel'
	| 'Profile'
	| 'Hashtag'
	| 'FeedDetail'
	| 'ProfileOther'
	| 'Notification';

export type StatusOrigin = 'other' | 'noti';
export type StatusType =
	| 'normal'
	| 'reblog'
	| 'feedDetail'
	| 'reply'
	| 'notification';
