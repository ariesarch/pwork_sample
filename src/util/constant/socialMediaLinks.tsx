import {
	TwitterIcon,
	FacebookIcon,
	InstagramIcon,
	LinkedinIcon,
	RedditIcon,
	YoutubeIcon,
	TiktokIcon,
	TwitchIcon,
	PatreonIcon,
} from '@/util/svg/icon.profile';

export const SOCIAL_MEDIA_LINKS = [
	{ icon: <TwitterIcon />, title: 'Twitter' },
	{ icon: <FacebookIcon />, title: 'Facebook' },
	{ icon: <InstagramIcon />, title: 'Instagram' },
	{ icon: <LinkedinIcon />, title: 'Linkedin' },
	{ icon: <RedditIcon />, title: 'Reddit' },
	{ icon: <YoutubeIcon />, title: 'Youtube' },
	{ icon: <TiktokIcon />, title: 'TikTok' },
	{ icon: <TwitchIcon />, title: 'Twitch' },
	{ icon: <PatreonIcon />, title: 'Patreon' },
];

export const Icons: Record<string, JSX.Element> = {
	Twitter: <TwitterIcon />,
	Facebook: <FacebookIcon />,
	Instagram: <InstagramIcon />,
	Linkedin: <LinkedinIcon />,
	Reddit: <RedditIcon />,
	Youtube: <YoutubeIcon />,
	TikTok: <TiktokIcon />,
	Twitch: <TwitchIcon />,
	Patreon: <PatreonIcon />,
};
