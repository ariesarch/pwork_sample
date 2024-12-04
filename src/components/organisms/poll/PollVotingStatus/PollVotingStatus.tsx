import React, { useState, useCallback } from 'react';
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

const PollVotingStatus = ({
	poll,
	accountId,
	inReplyToId,
}: {
	poll: Pathchwork.Poll;
	accountId: string;
	inReplyToId: Pathchwork.Status['in_reply_to_id'];
}) => {
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
				if (poll.multiple) {
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
		[poll.multiple],
	);

	// ******** Poll Vote Mutation ******** //
	const { mutate, isPending } = useVoteMutation({
		onSuccess: response => {
			if (currentFeed) {
				const updateFeedDatailData = updatePollStatus(
					currentFeed,
					selectedIndices,
				);
				setActiveFeed(updateFeedDatailData);
			}

			const queryKeys = getCacheQueryKeys<PollCacheQueryKeys>(
				accountId,
				inReplyToId,
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
			mutate({ id: poll.id, choices: Array.from(selectedIndices) });
		}
	}, [selectedIndices, mutate]);
	// ******** Poll Vote Mutation ******** //

	const expired =
		poll.expired ||
		(poll.expires_at !== null &&
			new Date(poll.expires_at).getTime() < Date.now());

	const showResults = poll.voted || expired;

	return (
		<View className="py-1">
			<View>
				{poll.options.map((option, index) => (
					<PollVotingOption
						key={index}
						poll={poll}
						title={option.title}
						votesCount={option.votes_count}
						isSelected={selectedIndices.has(index)}
						optionIndex={index}
						handleOptionSelect={() => handleOptionSelect(index)}
						showResults={showResults || checkResults}
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
				votesCount={poll.votes_count}
				votersCount={poll.voters_count}
				isMultiple={poll.multiple}
				expired={expired}
				expiresAt={poll.expires_at}
			/>
		</View>
	);
};

export default PollVotingStatus;
