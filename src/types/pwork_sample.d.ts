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
	};
}
