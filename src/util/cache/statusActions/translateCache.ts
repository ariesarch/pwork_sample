import { queryClient } from '@/App';
import { StatusCacheQueryKeys } from '../queryCacheHelper';

type TranslateStatusCacheParams = {
	response: { content: string; statusId: string }; // Include statusId
	queryKeys: StatusCacheQueryKeys[];
	showTranslatedText: boolean;
};

const translateStatusFromFeed = (
	data: IFeedQueryFnData,
	response: { content: string; statusId: string },
	showTranslatedText: boolean,
): IFeedQueryFnData => ({
	...data,
	pages: data.pages.map(page => ({
		...page,
		data: page.data.map(status => {
			if (status.id === response.statusId) {
				if (showTranslatedText) {
					return {
						...status,
						translated_text: response.content,
					};
				} else {
					return {
						...status,
						content: status.content,
						translated_text: '',
					};
				}
			}
			// else {
			// 	return {
			// 		...status,
			// 		content: status.content,
			// 		translated_text: '',
			// 	};
			// }
			return status;
		}),
	})),
});

const translateStatusFromQueryCache = (
	queryKey: StatusCacheQueryKeys,
	response: { content: string; statusId: string }, // Include statusId
	showTranslatedText: boolean,
) => {
	const previousData = queryClient.getQueryData<IFeedQueryFnData>(queryKey);
	if (!previousData) return;
	const updatedData = translateStatusFromFeed(
		previousData,
		response,
		showTranslatedText,
	);

	queryClient.setQueryData(queryKey, updatedData);
};

const translateStatusCacheData = ({
	response,
	queryKeys,
	showTranslatedText,
}: TranslateStatusCacheParams): void => {
	queryKeys.forEach(queryKey => {
		translateStatusFromQueryCache(queryKey, response, showTranslatedText);
	});
};

export { translateStatusFromFeed, translateStatusCacheData };
