export type GetMyChannelListQueryKey = ['my-channel'];

export type GetRecommendedChannelsQueryKey = ['recommended-channel'];

export type GetChannelFeedQueryKey = [
	'channel-feed',
	{ domain_name: string; remote: boolean; only_media: boolean },
];

export type GetChannelAboutQueryKey = [
	'channel-about',
	{ domain_name: string },
];

export type GetChannelAdditionalInfoQueryKey = [
	'channel-additional-info',
	{ domain_name: string },
];
