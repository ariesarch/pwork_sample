export const appendInstance = (username: string) => {
	const domain = '@channel.org';
	const regex = /^@\w+$/;

	if (regex.test(username)) {
		return `${username}${domain}`;
	}
	return username;
};
