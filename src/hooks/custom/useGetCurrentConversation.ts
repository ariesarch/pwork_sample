import { queryClient } from '@/App';
import { useActiveConversationActions } from '@/store/conversation/activeConversationStore';
import { PaginatedResponse } from '@/types/queries/conversations.type';
import { useEffect, useState } from 'react';
import { useGetConversationsList } from '../queries/conversations.queries';
import {
	findMatchingStatus,
	getCurrentTotalMessageListAtPageEntry,
	isFromNotificationMatch,
} from '@/util/helper/conversation';
import { useFeedDetailQuery } from '../queries/feed.queries';
import { DEFAULT_API_URL } from '@/util/constant';

const useGetCurrentConversation = (
	lastMsgId: string,
	isFromNotification: boolean | undefined,
) => {
	if (!lastMsgId) return;
	const [currentConversation, setConversation] =
		useState<Patchwork.Conversations>();
	const { saveActiveConversation } = useActiveConversationActions();
	const totalMsgList = getCurrentTotalMessageListAtPageEntry(
		isFromNotification,
		lastMsgId,
	);

	const cachedConversationList = queryClient.getQueryData<
		PaginatedResponse<Patchwork.Conversations[]>
	>(['conversations']);

	const currentMsgFromCache = cachedConversationList?.pages
		.flatMap(page => page)
		.find(item =>
			isFromNotification
				? isFromNotificationMatch(item, totalMsgList)
				: item.last_status.id === lastMsgId,
		);

	useGetConversationsList({
		enabled: !currentMsgFromCache,
	});

	const { data: statusItemClickedByNoti } = useFeedDetailQuery({
		domain_name: process.env.API_URL ?? DEFAULT_API_URL,
		id: lastMsgId,
		options: {
			enabled: isFromNotification,
		},
	});

	useEffect(() => {
		if (currentMsgFromCache) {
			saveActiveConversation(currentMsgFromCache);
			if (isFromNotification && statusItemClickedByNoti) {
				setConversation({
					...currentMsgFromCache,
					last_status: statusItemClickedByNoti as Patchwork.Status,
				});
				return;
			}
			setConversation(currentMsgFromCache);
		}
		//temp
		if (!currentMsgFromCache && isFromNotification) {
			const currentConv = cachedConversationList?.pages
				.flatMap(page => page)
				.find(item => item.last_status.id === lastMsgId);
			saveActiveConversation(currentConv);
			setConversation(currentConv);
		}
	}, [lastMsgId, currentMsgFromCache, statusItemClickedByNoti]);

	return currentConversation;
};

export default useGetCurrentConversation;
