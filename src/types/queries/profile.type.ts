export type ProfileDetailQueryParam = {
	id: string;
};

export type ProfileDetailQueryKey = [
	'get_profile_detail_info_by_account',
	ProfileDetailQueryParam,
];

export type ProfileDetailStatusQueryKey = [
	'get_profile_detail_statuses_by_account',
	ProfileDetailQueryParam,
];

export type UpdateProfileCredentialsQueryParam = {
	display_name: string;
	note: string;
	avatar: string;
	header: string;
	bot: boolean;
	discoverable: boolean;
	hide_collections: boolean;
	country: string;
	fields: [
		{ name: 'Website'; value: string },
		{ name: 'Twitter'; value: string },
		{ name: 'TikTok'; value: string },
		{ name: 'Youtube'; value: string },
		{ name: 'Linkedin'; value: string },
		{ name: 'Instagram'; value: string },
		{ name: 'Substack'; value: string },
		{ name: 'Facebook'; value: string },
		{ name: 'Email'; value: string },
	];
};

export type UpdateProfileCredentialsQueryKey = [
	'update_credentials',
	UpdateProfileCredentialsQueryParam,
];
