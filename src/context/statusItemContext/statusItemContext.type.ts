export type StatusCurrentPage =
	| 'Channel'
	| 'Profile'
	| 'Hashtag'
	| 'FeedDetail'
	| 'ProfileOther'
	| 'Notification'
	| 'Compose'
	| 'BookmarkList';

export type StatusOrigin = 'other' | 'noti' | 'hashtag';
export type StatusType =
	| 'normal'
	| 'reblog'
	| 'feedDetail'
	| 'reply'
	| 'reposting'
	| 'notification';
