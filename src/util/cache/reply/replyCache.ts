import { queryClient } from '@/App';
import { FeedRepliesQueryKey } from '@/types/queries/feed.type';
import { DEFAULT_API_URL } from '@/util/constant';
import { updateReplyCountInFeed } from '@/util/helper/compose';
import { cloneDeep, get, set, times } from 'lodash';

export const updateReplyFeedCache = (
	feedReplyQueryKey: FeedRepliesQueryKey,
	newStatus: Pathchwork.Status,
	feedDetailStatusId: string,
) => {
	queryClient.setQueryData<Pathchwork.TimelineReplies>(
		feedReplyQueryKey,
		oldData => {
			const { domain_name } = feedReplyQueryKey[1];
			const default_domain = process.env.API_URL ?? DEFAULT_API_URL;
			if (!oldData) return oldData;

			if (
				newStatus.in_reply_to_id == feedDetailStatusId &&
				domain_name == default_domain
			) {
				return {
					...oldData,
					descendants: [...oldData.descendants, newStatus],
				};
			} else {
				if (domain_name == default_domain) {
					queryClient.invalidateQueries({ queryKey: feedReplyQueryKey });
					return oldData;
				}
				times(4, i => {
					setTimeout(() => {
						queryClient.invalidateQueries({ queryKey: feedReplyQueryKey });
					}, i * 600);
				});
				return oldData;
			}
		},
	);
};

export const updateAccountDetailFeedCache = (
	domain_name: string,
	accountId: string,
	statusId: string,
	operation?: 'increase' | 'decrease',
) => {
	const accountDetailFeedQueryKey = [
		'account-detail-feed',
		{
			domain_name: domain_name,
			account_id: accountId,
			exclude_replies: true,
			exclude_reblogs: false,
			exclude_original_statuses: false,
		},
	];
	const previousData = queryClient.getQueryData<IFeedQueryFnData>(
		accountDetailFeedQueryKey,
	);
	if (!previousData) return;

	const updatedData = updateReplyCountInFeed(
		previousData,
		statusId,
		operation ?? 'increase',
	);
	queryClient.setQueryData(accountDetailFeedQueryKey, updatedData);
};

export const updateAccountDetailReplyFeedCache = (
	domain_name: string,
	accountId: string,
	statusId: string,
	operation?: 'increase' | 'decrease',
) => {
	const accountDetailFeedQueryKey = [
		'account-detail-feed',
		{
			domain_name: domain_name,
			account_id: accountId,
			exclude_replies: false,
			exclude_reblogs: true,
			exclude_original_statuses: true,
		},
	];
	const previousData = queryClient.getQueryData<IFeedQueryFnData>(
		accountDetailFeedQueryKey,
	);
	if (!previousData) return;
	const updatedData = updateReplyCountInFeed(
		previousData,
		statusId,
		operation ?? 'increase',
	);
	queryClient.setQueryData(accountDetailFeedQueryKey, updatedData);
};

export const updateReplyCountChannelFeedCache = (
	domain_name: string,
	statusId: string,
	operation?: 'increase' | 'decrease',
) => {
	const queryKey = [
		'channel-feed',
		{ domain_name, remote: false, only_media: false },
	];
	const previousData = queryClient.getQueryData<IFeedQueryFnData>(queryKey);
	if (!previousData) return;
	const updatedData = updateReplyCountInFeed(
		previousData,
		statusId,
		operation ?? 'increase',
	);
	queryClient.setQueryData(queryKey, updatedData);
};

export const updateReplyCountInAccountFeedCache = (
	domain_name: string,
	accountId: string,
	statusId: string,
	operation?: 'increase' | 'decrease',
) => {
	updateAccountDetailFeedCache(domain_name, accountId, statusId, operation);
	updateAccountDetailReplyFeedCache(
		domain_name,
		accountId,
		statusId,
		operation,
	);
};

export const updateReplyCountInHashtagFeed = (
	extraPayload: Record<string, any> | undefined,
	statusId: string,
	operation?: 'increase' | 'decrease',
) => {
	if (extraPayload?.domain_name && extraPayload?.hashtag) {
		const queryKey = [
			'hashtag-detail-feed',
			{ domain_name: extraPayload.domain_name, hashtag: extraPayload.hashtag },
		];
		const previousData = queryClient.getQueryData<IFeedQueryFnData>(queryKey);

		if (!previousData) return;
		const updatedData = updateReplyCountInFeed(
			previousData,
			statusId,
			operation ?? 'increase',
		);
		queryClient.setQueryData(queryKey, updatedData);
	}
};
