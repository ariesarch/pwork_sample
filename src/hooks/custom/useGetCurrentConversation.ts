import { queryClient } from '@/App';
import { useActiveConversationActions } from '@/store/conversation/activeConversationStore';
import { PaginatedResponse } from '@/types/queries/conversations.type';
import { useEffect, useState } from 'react';

const useGetCurrentConversation = (lastMsgId: string) => {
	const [currentConversation, setConversation] =
		useState<Pathchwork.Conversations>();
	const { saveActiveConversation } = useActiveConversationActions();

	useEffect(() => {
		const cachedConversationList = queryClient.getQueryData<
			PaginatedResponse<Pathchwork.Conversations[]>
		>(['conversations']);

		if (!cachedConversationList) return undefined;

		const current = cachedConversationList.pages
			.flat()
			.find(item => item.last_status.id == lastMsgId);
		setConversation(current);
		saveActiveConversation(current);
	}, []);

	return currentConversation;
};

export default useGetCurrentConversation;
