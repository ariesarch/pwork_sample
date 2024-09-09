/// <reference types="nativewind/types" />

declare namespace Pathchwork {
	type User = {
		name: string;
		address: string;
		id: string;
	};
	type Country = {
		alpha2: string;
		common_name: string;
		emoji_flag: string;
		country_code: string;
	};
	type Collection = {
		id: number;
		name: string;
		slug: string;
		image_file_name: string;
		image_content_type: string;
		image_file_size: number;
		image_updated_at: string;
		community_count: number;
		created_at: string;
		updated_at: string;
		image_url: string;
		is_virtual: boolean;
	};
	type Status = {
		id: number;
		account: Account;
		content: string;
		created_at: string;
		favourite_count: number;
		reblogs_count: number;
		replies_count: number;
		image?: string;
		statusType: 'reblog' | 'reply' | 'feed';
		reblogedStatus?: Status;
		replyedStatus?: Status;
	};

	type Account = {
		id: string;
		account_id: string;
		username: string;
		acct: string;
		avatar: string;
		hasNoti?: boolean;
	};

	type ChannelList = {
		id: string;
		title: string;
		image: string;
	};

	type HashTag = {
		id: string;
		name: string;
		hasNoti?: boolean;
	};

	type Channel = {
		id: string;
		name: string;
		is_private: boolean;
		slug: string;
		image_updated_at: string;
		description: string;
		image_url: string;
		created_at: string;
		updated_at: string;
	};

	type Status = {
		id: string;
		communities: Array<{
			id: number;
			name: string;
			slug: string;
		}>;
		community_ids?: string[]; // Scheduled Status
		community_id: number;
		community_name: stirng;
		community_slug: string;
		created_at: string;
		in_reply_to_id?: null;
		in_reply_to_account_id?: null;
		sensitive: boolean;
		spoiler_text?: string;
		visibility: string;
		language: string;
		uri: string;
		url: string;
		replies_count: number;
		reblogs_count: number;
		favourites_count: number;
		translated_text: string;
		edited_at?: null;
		image_url: string;
		favourited: boolean;
		meta_title: string;
		bookmarked: boolean;
		reblogged: boolean;
		muted: boolean;
		pinned: boolean;
		content: string;
		filtered: any;
		reblog?: Status;
		application: {
			name: string;
			website?: null;
		};
		account: Account;
		media_attachments: Attachment[];
		mentions: any;
		tags: any;
		emojis: any;
		card?: Card;
		poll?: Poll;
		is_rss_content: boolean;
		rss_link: string | null;
		is_meta_preview: boolean;
		text?: string;
		text_count: number;
		scheduled_at?: string;
		drafted?: boolean;
	};
}
