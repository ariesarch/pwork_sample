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

export type HashtagDetailFeedQueryKey = [
	'hashtag-detail-feed',
	{ domain_name: string; hashtag: string },
];

export type LinkPreviewQueryKey = ['link-preview', { url: string }];

export type Poll = {
	options: string[];
	expires_in: number;
	multiple: boolean;
};

type Media = {
	media_ids: string[];
};

export type ComposeMutationPayload = {
	in_reply_to_id: string | undefined;
	language: string;
	sensitive?: boolean;
	spoiler_text?: string;
	status: string;
	visibility: 'public' | 'unlisted' | 'private' | 'direct';
	poll: Poll | null;
} & Media;

export type RepostMutationPayload = {
	id: string;
} & ComposeMutationPayload;
