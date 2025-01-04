import { queryClient } from '@/App';
import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { AccountDetailFeedQueryKey } from '@/types/queries/feed.type';
import { DEFAULT_API_URL } from '@/util/constant';

export type PollCacheQueryKeys =
	| GetChannelFeedQueryKey
	| AccountDetailFeedQueryKey;

type UpdatePollCacheParams = {
	response: Patchwork.Status['poll'];
	selectedIndices: Set<number>;
	queryKeys: PollCacheQueryKeys[];
};

const updatePollStatus = (
	status: Patchwork.Status,
	selectedIndices: Set<number>,
): Patchwork.Status => ({
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
	response: Patchwork.Status['poll'],
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

const updateQueryCache = (
	queryKey: PollCacheQueryKeys,
	response: Patchwork.Status['poll'],
	selectedIndices: Set<number>,
) => {
	const previousData = queryClient.getQueryData<IFeedQueryFnData>(queryKey);
	if (!previousData) return;

	const updatedData = updateFeedQueryCache(
		previousData,
		response,
		selectedIndices,
	);

	queryClient.setQueryData(queryKey, updatedData);
};

const updatePollCacheData = ({
	response,
	selectedIndices,
	queryKeys,
}: UpdatePollCacheParams): void => {
	queryKeys.forEach(queryKey => {
		updateQueryCache(queryKey, response, selectedIndices);
	});
};

const getPollCacheQueryKeys = (accountId: string): PollCacheQueryKeys[] => {
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
	];
};

export { updatePollStatus, updatePollCacheData, getPollCacheQueryKeys };
