import { queryClient } from '@/App';
import { PaginatedResponse } from '@/types/queries/conversations.type';
import { useEffect, useState } from 'react';
import { useGetConversationsList } from '../queries/conversations.queries';

const useGetCurrentConversation = (lastMsgId: string) => {
	const [currentConversation, setConversation] =
		useState<Pathchwork.Conversations>();

	const cachedConversationList = queryClient.getQueryData<
		PaginatedResponse<Pathchwork.Conversations[]>
	>(['conversations']);

	const currentMsgFromCache = cachedConversationList?.pages
		.flatMap(page => page)
		.find(item => item.last_status.id === lastMsgId);

	const { data: fetchedConversationList } = useGetConversationsList({
		enabled: !currentMsgFromCache,
	});

	useEffect(() => {
		if (currentMsgFromCache) {
			console.log('Found current message from cache');
			setConversation(currentMsgFromCache);
			// } else if (fetchedConversationList) {
			// 	const currentMsgFromFetched = fetchedConversationList.pages
			// 		.flatMap(page => page)
			// 		.find(item => item.last_status.id === lastMsgId);
			// 	if (currentMsgFromFetched) {
			// 		console.log('Found current message from fetched data');
			// 		setConversation(currentMsgFromFetched);
			// 	} else {
			// 		console.log('No matching conversation found');
			// 		setConversation(null);
			// 	}
		}
	}, [lastMsgId, currentMsgFromCache]);
	return currentConversation;
};

export default useGetCurrentConversation;
