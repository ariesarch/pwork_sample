export type VisibilitySettingsProps = {
	label: string;
	icon: Patchwork.ComposeVisibility;
};

export const visibilitySettingsData: VisibilitySettingsProps[] = [
	{ label: 'Anyone', icon: 'public' },
	{ label: 'Local only', icon: 'local' },
	{
		label: 'Anyone, but not listed in timelines',
		icon: 'unlisted',
	},
	{ label: 'Followers only', icon: 'private' },
	{ label: 'People mentioned only', icon: 'direct' },
];
