import React, { memo } from 'react';
import { View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { Button } from '@/components/atoms/common/Button/Button';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

interface PollVotingControlsProps {
	onToggleCheckResults: () => void;
	handleVote: () => void;
	showResults: boolean;
	canVote: boolean;
	isPending: boolean;
	checkResults: boolean;
}
const PollVotingControls = ({
	onToggleCheckResults,
	handleVote,
	canVote,
	checkResults,
	isPending,
	showResults,
}: PollVotingControlsProps) => {
	if (showResults) return null;

	return (
		<View className="flex-row items-center justify-between mt-1">
			<Button
				className="w-2/5"
				variant="outline"
				size="sm"
				onPress={onToggleCheckResults}
			>
				<ThemeText size={'xs_12'}>
					{checkResults ? 'Hide Results' : 'Show Results'}
				</ThemeText>
			</Button>
			<Button
				size="sm"
				disabled={!canVote || checkResults || isPending}
				onPress={handleVote}
				className="w-3/12"
			>
				{isPending ? (
					<Flow size={20} color={'#fff'} className="my-2" />
				) : (
					<ThemeText size={'xs_12'}>Send Vote</ThemeText>
				)}
			</Button>
		</View>
	);
};

export default memo(PollVotingControls);
