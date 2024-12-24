export type StatusCurrentPage =
	| 'Channel'
	| 'Profile'
	| 'Hashtag'
	| 'FeedDetail'
	| 'ProfileOther'
	| 'Notification'
	| 'Compose';

export type StatusOrigin = 'other' | 'noti' | 'hashtag';
export type StatusType =
	| 'normal'
	| 'reblog'
	| 'feedDetail'
	| 'reply'
	| 'reposting'
	| 'notification';
