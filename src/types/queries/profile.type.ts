import { Asset } from 'react-native-image-picker';
import { string } from 'yup';

export type AccountInfoQueryParam = {
	id: string;
	domain_name: string;
};

export type CheckRelationshipQueryParam = {
	accountIds: string[];
};

export type SpecificServerProfileQueryParam = {
	q: string;
};

export type AccountInfoQueryKey = ['get_account_info', AccountInfoQueryParam];
export type CheckRelationshipQueryKey = [
	'check-relationship-to-other-accounts',
	CheckRelationshipQueryParam,
];
export type SpecificServerProfileQueryKey = [
	'specify-server-profile',
	SpecificServerProfileQueryParam,
];

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
