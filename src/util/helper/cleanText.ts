export const cleanText = (htmlString: string) => {
	return htmlString?.replace(/<\/?[^>]+(>|$)/g, '');
};
