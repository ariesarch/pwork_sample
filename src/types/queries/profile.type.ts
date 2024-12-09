import { Asset } from 'react-native-image-picker';
import { string } from 'yup';

export type AccountInfoQueryParam = {
	id: string;
	domain_name: string;
};

export type CheckRelationshipQueryParam = {
	accountIds: string[];
};

export type AccountInfoQueryKey = ['get_account_info', AccountInfoQueryParam];
export type CheckRelationshipQueryKey = [
	'check-relationship-to-other-accounts',
	CheckRelationshipQueryParam,
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

export type UpdateProfilePayload = {
	display_name?: string;
	note?: string;
	avatar?: string | Asset;
	header?: string | Asset;
	locked?: boolean;
	bot?: boolean;
	discoverable?: boolean;
	hide_collections?: boolean;
	indexable?: boolean;
	fields_attributes?: {
		0: {
			name: string;
			value?: string;
		};
		1: {
			name: string;
			value?: string;
		};
		2: {
			name: string;
			value?: string;
		};
		3: {
			name: string;
			value?: string;
		};
		4: {
			name: string;
			value?: string;
		};
		5: {
			name: string;
			value?: string;
		};
		6: {
			name: string;
			value?: string;
		};
		7: {
			name: string;
			value?: string;
		};
		8: {
			name: string;
			value?: string;
		};
	};
	source?: {
		privacy: string;
		sensitive: boolean;
		language: string;
	};
};
