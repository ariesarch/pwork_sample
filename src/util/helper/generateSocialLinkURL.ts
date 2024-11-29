export const generateSocialLinkURL = (name: string, value: string): string => {
	const baseUrl = `https://www.${name.toLocaleLowerCase()}.com`;

	switch (name) {
		case 'Reddit':
			return `${baseUrl}/u/${value}`;
		case 'Linkedin':
			return `${baseUrl}/in/${value}`;
		case 'Youtube':
		case 'TikTok':
			return `${baseUrl}/@${value}`;
		case 'Twitch':
			return `${baseUrl}.tv/${value}`;
		default:
			return `${baseUrl}/${value}`;
	}
};
