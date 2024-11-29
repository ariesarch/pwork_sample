import { UpdateProfilePayload } from '@/types/queries/profile.type';

export const generateFieldsAttributes = (
	userInfo: Pathchwork.Account,
	link: string,
	username: string,
	type: 'edit' | 'delete',
): UpdateProfilePayload['fields_attributes'] => {
	const platforms = [
		'Twitter',
		'Instagram',
		'Linkedin',
		'Youtube',
		'Facebook',
		'Reddit',
		'TikTok',
		'Twitch',
		'Patreon',
	];

	return platforms.reduce((acc, platform, index) => {
		acc[index as keyof UpdateProfilePayload['fields_attributes']] = {
			name: platform,
			value:
				type === 'delete' && link === platform
					? ''
					: link === platform && username
					? username
					: userInfo?.fields?.find(v => v.name === platform)?.value || '',
		};
		return acc;
	}, {} as UpdateProfilePayload['fields_attributes']);
};
