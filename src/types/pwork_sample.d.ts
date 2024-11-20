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
		type: string;
		attributes: ChannelAttributes;
	};

	type ChannelAttributes = {
		id: number;
		name: string;
		slug: string;
		description: string;
		is_recommended: boolean;
		admin_following_count: number;
		account_id: number;
		patchwork_collection_id: number;
		guides: string;
		participants_count: number;
		visibility: string;
		community_type: {
			data: {
				id: string;
				type: string;
				attributes: {
					id: number;
					name: string;
				};
			};
		};
		banner_image_url: string;
		avatar_image_url: string;
		domain_name: string;
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
		domain_name: string;
		image_url: string;
		created_at: string;
		updated_at: string;
	};

	// type Channel = {
	// 	id: string;
	// 	type: string;
	// 	attributes: {
	// 		id: number;
	// 		name: string;
	// 		slug: string;
	// 		description: string;
	// 		is_recommended: boolean;
	// 		admin_following_count: number;
	// 		account_id: number;
	// 		patchwork_collection_id: number;
	// 		guides?: Guide;
	// 		participants_count: number;
	// 		visibility: string;
	// 		domain_name: string;
	// 		status: string;
	// 		banner_image_url: string;
	// 		avatar_image_url: string;
	// 	};
	// };

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
		tags: Tags[];
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

	type StatusDetail = {
		id: string;
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
		edited_at?: string;
		content: string;
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
	};

	type HashtagDetail = {
		history: HashtagHistory[];
		name: string;
		url: string;
	};

	type HashtagHistory = {
		day: string;
		accounts: string;
		uses: string;
	};

	type ChannelAbout = {
		configuration: any;
		contact: {
			account: {
				acct: string;
				avatar: string;
				avatar_static: string;
				bot: boolean;
				created_at: string;
				discoverable: null;
				display_name: string;
				emojis: [];
				fields: [];
				followers_count: number;
				following_count: number;
				group: boolean;
				header: string;
				header_static: string;
				hide_collections: null;
				id: string;
				indexable: boolean;
				last_status_at: string;
				locked: boolean;
				noindex: boolean;
				note: string;
				statuses_count: number;
				uri: string;
				url: string;
				username: string;
			};
		};
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

	type ChannelAdditionalInfo = {
		content: string;
		updated_at: string;
	};

	type TimelineReplies = {
		ancestors: Status[];
		descendants: Status[];
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
	type ImageUrl = {
		id: Pathchwork.Attachment['id'];
		preview_url?: Pathchwork.Attachment['preview_url'];
		url: Pathchwork.Attachment['url'];
		remote_url?: Pathchwork.Attachment['remote_url'];
		id: Pathchwork.Attachment['id'];
		preview_url?: Pathchwork.Attachment['preview_url'];
		url: Pathchwork.Attachment['url'];
		remote_url?: Pathchwork.Attachment['remote_url'];
		sensitive?: boolean;
		width?: number;
		height?: number;
	};

	// type Field = {
	// 	name: string;
	// 	value: string;
	// 	// verified_at?: string | null;
	// };

	type FieldName =
		| 'Website'
		| 'Twitter'
		| 'TikTok'
		| 'Youtube'
		| 'Linkedin'
		| 'Instagram'
		| 'Substack'
		| 'Facebook'
		| 'Email';

	type Field = {
		name: FieldName;
		value: string;
	};

	type ProfileDetail = {
		account_data: {
			account: Account;
			is_requested: boolean;
			is_my_account: boolean;
			is_followed: boolean;
		};
		community_images_url: string[];
		following_images_url: string[];
		is_admin: boolean;
		community_slug: string;
		account_type: string;
	};

	type Tags = {
		name: string;
		url: string;
	};

	type LoginRespone = {
		access_token: string;
		token_type: string;
		scope: string;
		created_at: string;
	};
}
