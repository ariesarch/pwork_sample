import { Asset } from 'react-native-image-picker';

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
	{
		domain_name: string;
		account_id: string;
		exclude_reblogs: boolean;
		exclude_replies: boolean;
		exclude_original_statuses: boolean;
	},
];

export type HashtagDetailFeedQueryKey = [
	'hashtag-detail-feed',
	{ domain_name: string; hashtag: string },
];

export type LinkPreviewQueryKey = ['link-preview', { url: string }];

export type MediaOrPoll =
	| {
			media_ids: string[];
	  }
	| {
			poll: string[];
	  };

export type ComposeMutationPayload = {
	in_reply_to_id: string | undefined;
	language: string;
	sensitive?: boolean;
	spoiler_text?: string;
	status: string;
	visibility: Pathchwork.ComposeVisibility;
} & MediaOrPoll;

export type RepostMutationPayload = {
	id: string;
} & ComposeMutationPayload;

export type ComposeImagePayload = {
	image: Asset;
	onProgressChange: (progress: number) => void;
};
