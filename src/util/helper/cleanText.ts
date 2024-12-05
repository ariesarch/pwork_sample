import he from 'he';

export const cleanText = (htmlString: string) => {
	if (!htmlString) return '';

	const withoutTags = htmlString.replace(/<\/?[^>]+(>|$)/g, '');
	const decodedString = he.decode(withoutTags);
	return decodedString;
};
