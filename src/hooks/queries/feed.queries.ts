import { getFeedDetail, getFeedReplies } from '@/services/feed.service';
import {
	FeedDetailQueryKey,
	FeedRepliesQueryKey,
} from '@/types/queries/feed.type';
import { useQuery } from '@tanstack/react-query';

export const useFeedDetailQuery = ({
	domain_name,
	id,
}: FeedDetailQueryKey[1]) => {
	const queryKey: FeedDetailQueryKey = ['feed-detail', { domain_name, id }];
	return useQuery({ queryKey, queryFn: getFeedDetail });
};

export const useFeedRepliesQuery = ({
	domain_name,
	id,
}: FeedRepliesQueryKey[1]) => {
	const queryKey: FeedRepliesQueryKey = ['feed-replies', { domain_name, id }];
	return useQuery({ queryKey, queryFn: getFeedReplies });
};
