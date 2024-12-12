import { queryClient } from '@/App';
import { PaginatedResponse } from '@/types/queries/conversations.type';

const useGetCurrentConversation = (lastMsgId: string) => {
	const cachedConversationList = queryClient.getQueryData<
		PaginatedResponse<Pathchwork.Conversations[]>
	>(['conversations']);

	if (!cachedConversationList) return undefined;

	const currentConversation = cachedConversationList.pages
		.flat()
		.find(item => item.last_status.id == lastMsgId);

	return currentConversation;
};

export default useGetCurrentConversation;
