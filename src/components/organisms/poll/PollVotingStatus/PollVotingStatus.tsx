import React, { useState, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useVoteMutation } from '@/hooks/mutations/vote.mutation';
import Toast from 'react-native-toast-message';
import PollVotingFooter from '@/components/molecules/poll/PollVotingFooter/PollVotingFooter';
import PollVotingOption from '@/components/molecules/poll/PollVotingOption/PollVotingOption';
import PollVotingControls from '@/components/molecules/poll/PollVotingControls/PollVotingControls';
import {
	PollCacheQueryKeys,
	updatePollCacheData,
	updatePollStatus,
} from '@/util/cache/poll/pollCache';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import { getCacheQueryKeys } from '@/util/cache/queryCacheHelper';
import { useActiveDomainStore } from '@/store/feed/activeDomain';
import { useAuthStore } from '@/store/auth/authStore';
import { queryClient } from '@/App';

const PollVotingStatus = ({
	status,
	isFeedDetail,
	isReposting,
}: {
	status: Pathchwork.Status;
	isFeedDetail?: boolean;
	isReposting?: boolean;
}) => {
	const { domain_name } = useActiveDomainStore();
	const { userInfo } = useAuthStore();

	const currentFeed = useCurrentActiveFeed();
	const { setActiveFeed } = useActiveFeedAction();

	const [checkResults, setCheckResults] = useState(false);
	const onToggleCheckResults = () => setCheckResults(prevState => !prevState);

	const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
		new Set(),
	);

	const handleOptionSelect = useCallback(
		(index: number) => {
			setSelectedIndices(prev => {
				const updatedIndices = new Set(prev);
				if (status.poll.multiple) {
					updatedIndices.has(index)
						? updatedIndices.delete(index)
						: updatedIndices.add(index);
				} else {
					updatedIndices.clear();
					updatedIndices.add(index);
				}
				return updatedIndices;
			});
		},
		[status.poll.multiple],
	);

	// ******** Poll Vote Mutation ******** //
	const accountDetailFeedQueryKey = [
		'account-detail-feed',
		{
			domain_name: domain_name,
			account_id: userInfo?.id!,
			exclude_replies: true,
			exclude_reblogs: false,
			exclude_original_statuses: false,
		},
	];

	const { mutate, isPending } = useVoteMutation({
		onSuccess: response => {
			if (isFeedDetail && currentFeed?.id === status.id) {
				const updateFeedDatailData = updatePollStatus(
					currentFeed,
					selectedIndices,
				);
				setActiveFeed(updateFeedDatailData);
			}

			if (status.reblogged) {
				return queryClient.invalidateQueries({
					queryKey: accountDetailFeedQueryKey,
				});
			}

			const queryKeys = getCacheQueryKeys<PollCacheQueryKeys>(
				status.account.id,
				status.in_reply_to_id,
				status.in_reply_to_account_id,
				status.reblog ? true : false,
				domain_name,
			);
			updatePollCacheData({
				response,
				selectedIndices,
				queryKeys,
			});
		},
		onError: e => {
			Toast.show({
				type: 'errorToast',
				text1: e.message,
				position: 'top',
				topOffset: 50,
			});
		},
	});

	const handleVote = useCallback(() => {
		if (selectedIndices.size > 0) {
			mutate({ id: status.poll.id, choices: Array.from(selectedIndices) });
		}
	}, [selectedIndices, mutate]);
	// ******** Poll Vote Mutation ******** //

	const expired =
		status.poll.expired ||
		(status.poll.expires_at !== null &&
			new Date(status.poll.expires_at).getTime() < Date.now());

	const showResults = status.poll.voted || expired;

	return (
		<View className="py-1">
			<View>
				{status.poll.options.map((option, index) => (
					<PollVotingOption
						key={index}
						poll={status.poll}
						title={option.title}
						votesCount={option.votes_count}
						isSelected={selectedIndices.has(index)}
						optionIndex={index}
						handleOptionSelect={() => handleOptionSelect(index)}
						showResults={showResults || checkResults}
						isReposting={isReposting}
					/>
				))}
			</View>

			<PollVotingControls
				{...{
					onToggleCheckResults,
					handleVote,
					showResults,
					isPending,
					checkResults,
				}}
				canVote={selectedIndices.size > 0}
			/>

			<PollVotingFooter
				votesCount={status.poll.votes_count}
				votersCount={status.poll.voters_count}
				isMultiple={status.poll.multiple}
				expired={expired}
				expiresAt={status.poll.expires_at}
			/>
		</View>
	);
};

export default PollVotingStatus;
