import { queryClient } from '@/App';
import { FeedRepliesQueryKey } from '@/types/queries/feed.type';
import { DEFAULT_API_URL } from '@/util/constant';
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
						console.log('bb::', i);
						queryClient.invalidateQueries({ queryKey: feedReplyQueryKey });
					}, i * 600);
				});
				return oldData;
			}
		},
	);
};
