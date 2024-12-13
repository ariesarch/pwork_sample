import { useGetConversationsList } from '../queries/conversations.queries';

const useGetReceiver = (lastMsgId: string) => {
	const { data: conversationList } = useGetConversationsList();

	const currentConversation = conversationList.pages
		.flat()
		.find(item => item.last_status.id == lastMsgId);

	return currentConversation?.accounts[0];
};

export default useGetReceiver;
