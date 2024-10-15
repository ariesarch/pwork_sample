export type FeedDetailQueryKey = [
	'feed-detail',
	{ id: string; domain_name: string },
];

export type FeedRepliesQueryKey = [
	'feed-replies',
	{ id: string; domain_name: string },
];

export type AccountDetailFeedQueryKey = [
	'account-detail-feed',
	{ domain_name: string; account_id: string },
];
