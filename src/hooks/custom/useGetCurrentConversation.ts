import { queryClient } from '@/App';
import { useActiveConversationActions } from '@/store/conversation/activeConversationStore';
import { PaginatedResponse } from '@/types/queries/conversations.type';
import { useEffect, useState } from 'react';
import { useGetConversationsList } from '../queries/conversations.queries';

const useGetCurrentConversation = (lastMsgId: string) => {
	const [currentConversation, setConversation] =
		useState<Pathchwork.Conversations>();
	const { saveActiveConversation } = useActiveConversationActions();

	const cachedConversationList = queryClient.getQueryData<
		PaginatedResponse<Pathchwork.Conversations[]>
	>(['conversations']);

	const currentMsgFromCache = cachedConversationList?.pages
		.flatMap(page => page)
		.find(item => item.last_status.id === lastMsgId);

	useGetConversationsList({
		enabled: !currentMsgFromCache,
	});

	useEffect(() => {
		if (currentMsgFromCache) {
			saveActiveConversation(currentMsgFromCache);
			setConversation(currentMsgFromCache);
		}
	}, [lastMsgId, currentMsgFromCache]);

	return currentConversation;
};

export default useGetCurrentConversation;
