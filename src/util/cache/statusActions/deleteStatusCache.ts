import { FeedDetail } from '@/screens';
import { queryClient } from '@/App';
import { StatusCacheQueryKeys } from '../queryCacheHelper';
import { FeedRepliesQueryKey } from '@/types/queries/feed.type';
import { DEFAULT_API_URL } from '@/util/constant';

type DeleteStatusCacheParams = {
	status_id: Patchwork.Status['id'];
	queryKeys: StatusCacheQueryKeys[];
};

type DeleteFeedReplyCacheParams = {
	feedDetailId: Patchwork.Status['id'];
	queryKey: FeedRepliesQueryKey;
};

const deleteStatusFromFeed = (
	data: IFeedQueryFnData,
	status_id: string,
): IFeedQueryFnData => ({
	...data,
	pages: data.pages.map(page => ({
		...page,
		data: page.data.filter(status => status.id !== status_id),
	})),
});

const deleteStatusFromQueryCache = (
	queryKey: StatusCacheQueryKeys,
	status_id: string,
) => {
	const previousData = queryClient.getQueryData<IFeedQueryFnData>(queryKey);
	if (!previousData) return;
	const updatedData = deleteStatusFromFeed(previousData, status_id);

	queryClient.setQueryData(queryKey, updatedData);
};

const deleteStatusCacheData = ({
	status_id,
	queryKeys,
}: DeleteStatusCacheParams): void => {
	queryKeys.forEach(queryKey => {
		deleteStatusFromQueryCache(queryKey, status_id);
	});
};

const deleteDescendentReply = (
	feedDetailId: string,
	domain_name: string,
	statusId: string,
) => {
	if (domain_name == DEFAULT_API_URL) return;
	const feedDetailQueryKey = [
		'feed-replies',
		{ id: feedDetailId, domain_name: domain_name },
	];

	const previousData =
		queryClient.getQueryData<Patchwork.TimelineReplies>(feedDetailQueryKey);
	if (!previousData) return;

	const updatedData = previousData.descendants.filter(item => {
		return item.id !== statusId;
	});

	queryClient.setQueryData(feedDetailQueryKey, {
		...previousData,
		descendants: updatedData,
	});
};

export { deleteStatusFromFeed, deleteStatusCacheData, deleteDescendentReply };
