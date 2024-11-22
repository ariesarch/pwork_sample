export const cleanText = (htmlString: string): string => {
	const decoded = htmlString
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

	return decoded.replace(/<[^>]*>/g, '');
};
