import { queryClient } from '@/App';
import { PaginatedResponse } from '@/types/queries/conversations.type';

const useGetLatestMsgAndProfileInfo = (lastMsgId: string) => {
	const cachedConversationList = queryClient.getQueryData<
		PaginatedResponse<Pathchwork.Conversations[]>
	>(['conversations']);

	if (!cachedConversationList) {
		return { lastMessage: undefined, profileInfo: undefined };
	}

	const currentConversation = cachedConversationList.pages
		.flat()
		.find(item => item.last_status.id == lastMsgId);

	return {
		lastMessage: currentConversation?.last_status,
		chatParticipant: currentConversation?.accounts[0],
	};
};

export default useGetLatestMsgAndProfileInfo;
