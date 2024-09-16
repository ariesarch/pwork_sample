export type GetMyChannelListQueryKey = ['my-channel'];
export type GetChannelFeedQueryKey = [
	'channel-feed',
	{ slug: string; remote: boolean; only_media: boolean },
];

export type GetChannelAboutQueryKey = ['channel-about', { slug: string }];
