import { create } from 'zustand';

export type Message = {
	text: string;
	sender: string;
	time: string;
	status: string;
};

interface ChatHistoryStore {
	chatHistory: { id: string; name: string; messages: Message[] }[];
	setChatHistory: (id: string, name: string, messages: Message[]) => void;
}

export const useChatHistoryStore = create<ChatHistoryStore>(set => ({
	chatHistory: [],
	setChatHistory: (id, name, messages) =>
		set(state => {
			const exists = state.chatHistory.some(chat => chat.id === id);
			if (exists) {
				return {
					chatHistory: state.chatHistory.map(chat =>
						chat.id === id ? { ...chat, name, messages } : chat,
					),
				};
			} else {
				return {
					chatHistory: [...state.chatHistory, { id, name, messages }],
				};
			}
		}),
}));
