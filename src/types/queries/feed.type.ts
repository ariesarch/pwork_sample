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

export type TranslationLanguagesQueryKey = ['translation-languages'];

export type Poll = {
	options: string[];
	expires_in: number;
	multiple: boolean;
};

type Media = {
	media_ids: string[];
};

export type ComposeMutationPayload = {
	statusId?: string; // For Compose (Edit) Mutation //
	in_reply_to_id: string | undefined;
	language: string;
	sensitive?: boolean;
	spoiler_text?: string;
	status: string;
	visibility: Pathchwork.ComposeVisibility;
	max_length?: number;
	poll: Poll | null;
	media_ids: string[];
	crossChannelRequestIdentifier?: string;
};

export type RepostMutationPayload = {
	id: string;
} & ComposeMutationPayload;

export type ComposeImagePayload = {
	image: Asset;
	onProgressChange: (progress: number) => void;
};

export type ReportMutationPayload = {
	comment: string;
	account_id: Pathchwork.Account['id'] | undefined;
	status_ids: Array<Pathchwork.Status['id'] | undefined>;
	category: string;
	forward?: boolean;
	forward_to_domains?: string[];
	rule_ids?: string[] | null;
};
