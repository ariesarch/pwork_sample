import { queryClient } from '@/App';
import { DEFAULT_API_URL } from '@/util/constant';

export const addNewMsgToQueryCache = (
	msg: Pathchwork.Status,
	currentId: string,
) => {
	const domain_name = process.env.API_URL ?? DEFAULT_API_URL;

	queryClient.setQueryData<Pathchwork.TimelineReplies>(
		['message-list', { id: currentId }],
		oldData => {
			if (!oldData) return oldData;
			return {
				...oldData,
				descendants: [msg, ...oldData.descendants],
			};
		},
	);
};

export const changeLastMsgInConversationChache = (
	lastMsg: Pathchwork.Status,
	currentConversationId: string | undefined,
) => {
	queryClient.setQueryData(['conversations'], (oldData: any) => {
		if (!oldData) return oldData;
		return {
			...oldData,
			pages: oldData.pages.map((page: any) =>
				page.map((conversation: Pathchwork.Conversations) => {
					if (conversation?.id === currentConversationId) {
						return { ...conversation, last_status: lastMsg };
					} else {
						return conversation;
					}
				}),
			),
		};
	});
};

export const removeOldMsgListCacheAndCreateNewOne = (
	initialLastMsgId: string,
) => {
	queryClient.setQueryData<Pathchwork.TimelineReplies>(
		['message-list', { id: initialLastMsgId }],
		oldData => {
			if (!oldData) return undefined;
			if (oldData.descendants.length == 0) return oldData;
			const finalLastMsg = oldData.descendants[0];
			const updatedMsgListQueryKey = ['message-list', { id: finalLastMsg.id }];
			const updatedMsgQueryCache: Pathchwork.TimelineReplies = {
				ancestors: [...oldData.descendants.slice(1), ...oldData.ancestors],
				descendants: [],
			};
			queryClient.setQueryData(updatedMsgListQueryKey, updatedMsgQueryCache);
			return undefined;
		},
	);
};
