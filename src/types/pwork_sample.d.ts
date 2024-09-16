/* eslint-disable @typescript-eslint/no-explicit-any */
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

	type Account = {
		id: string;
		account_id: string;
		username: string;
		acct: string;
		display_name: string;
		locked: boolean;
		domain: string | null;
		bot: boolean;
		discoverable: boolean;
		hide_collections: boolean;
		group: boolean;
		created_at: string;
		note: string;
		url: string;
		avatar: string;
		image_url: string;
		avatar_static: string;
		header: string;
		header_static: string;
		primary_community_slug: string;
		primary_community_name: string;
		followers_count: number;
		following_count: number;
		statuses_count: number;
		last_status_at: string;
		collection_count: number;
		community_count: number;
		country: string;
		country_common_name: string;
		dob: string;
		is_followed: boolean;
		is_requested: boolean;
		subtitle: string;
		contributor_role: string;
		voices: string;
		media: string;
		hash_tag_count: number;
		noindex: boolean;
		emojis: [];
		fields: Field[];
		tags: AccountBioHashTags[];
		email: string;
		phone: string;
		about_me: string;
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
		mentions: Mention[];
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

	type ChannelAbout = {
		configuration: any;
		contact: { account: { username: string; created_at: string } };
		description: string;
		domain: string;
		languages: string;
		rules: ChannelAboutHint[];
		thumbnail: {
			blurhash: string;
			url: string;
		};
		title: string;
	};

	type ChannelAboutHint = {
		hint: string;
		id: string;
		text: string;
	};

	type Emoji = {
		shortcode: string;
		url: string;
		static_url: string;
		visible_in_picker: boolean;
		category?: string;
	};

	type Mention = {
		id: string;
		username: string;
		acct: string;
		url: string;
	};

	type Attachment = {
		id: string;
		type: 'image' | 'gifv' | 'video';
		url: string;
		preview_url: string;
		sensitive?: boolean;
		remote_url?: string;
		text_url?: string;
		meta?: {
			original?: {
				width: number;
				height: number;
				size: string;
				aspect: number;
			};
			small?: { width: number; height: number; size: string; aspect: number };
			focus?: { x: number; y: number };
		};
		description?: string;
		blurhash?: string;
	};
}
