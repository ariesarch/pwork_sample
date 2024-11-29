import { queryClient } from '@/App';
import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import {
	AccountDetailFeedQueryKey,
	FeedDetailQueryKey,
} from '@/types/queries/feed.type';
import { DEFAULT_API_URL } from '@/util/constant';

type QueryFnData = IFeedQueryFnData | IFeedDetailQueryFnData;

type PollCacheQueryKeys =
	| GetChannelFeedQueryKey
	| AccountDetailFeedQueryKey
	| FeedDetailQueryKey;

type UpdatePollCacheParams = {
	response: Pathchwork.Status['poll'];
	selectedIndices: Set<number>;
	queryKeys: PollCacheQueryKeys[];
};

const updatePollStatus = (
	status: Pathchwork.Status,
	selectedIndices: Set<number>,
): Pathchwork.Status => ({
	...status,
	poll: {
		...status.poll,
		voted: true,
		own_votes: Array.from(selectedIndices),
		options: status.poll.options.map((option, index) => ({
			...option,
			votes_count: selectedIndices.has(index)
				? option.votes_count + 1
				: option.votes_count,
		})),
		votes_count: status.poll.votes_count + selectedIndices.size,
		voters_count: status.poll.voters_count + 1,
	},
});

const updateFeedQueryCache = (
	data: IFeedQueryFnData,
	response: Pathchwork.Status['poll'],
	selectedIndices: Set<number>,
) => ({
	...data,
	pages: data.pages.map(page => ({
		...page,
		data: page.data.map(status => {
			if (status.poll?.id === response.id) {
				return updatePollStatus(status, selectedIndices);
			}
			return status;
		}),
	})),
});

const updateFeedDetailCache = (
	data: IFeedDetailQueryFnData,
	response: Pathchwork.Status['poll'],
	selectedIndices: Set<number>,
) => {
	return data.poll?.id === response.id
		? updatePollStatus(data, selectedIndices)
		: data;
};

const isFeedQueryData = (data: QueryFnData): data is IFeedQueryFnData => {
	return 'pages' in data;
};

const updateQueryCache = (
	queryKey: PollCacheQueryKeys,
	response: Pathchwork.Status['poll'],
	selectedIndices: Set<number>,
) => {
	const previousData = queryClient.getQueryData<QueryFnData>(queryKey);
	if (!previousData) return;

	const updatedData = isFeedQueryData(previousData)
		? updateFeedQueryCache(previousData, response, selectedIndices)
		: updateFeedDetailCache(previousData, response, selectedIndices);

	queryClient.setQueryData(queryKey, updatedData);
};

export const updatePollCacheData = ({
	response,
	selectedIndices,
	queryKeys,
}: UpdatePollCacheParams): void => {
	queryKeys.forEach(queryKey => {
		updateQueryCache(queryKey, response, selectedIndices);
	});
};

export const getPollCacheQueryKeys = (
	accountId: string,
	statusId: string,
): PollCacheQueryKeys[] => {
	const domain_name = process.env.API_URL || DEFAULT_API_URL;
	return [
		['channel-feed', { domain_name, remote: false, only_media: false }],
		[
			'account-detail-feed',
			{
				domain_name,
				account_id: accountId,
				exclude_replies: true,
				exclude_reblogs: false,
				exclude_original_statuses: false,
			},
		],
		['feed-detail', { id: statusId, domain_name }],
	];
};
