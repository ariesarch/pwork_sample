import React, { memo } from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { formatTimeLeft } from '@/util/helper/pollCalculation';

interface PollVotingFooterProps {
	votesCount: number;
	votersCount: number;
	isMultiple: boolean;
	expired: boolean;
	expiresAt: string | null;
}
const PollVotingFooter = ({
	votesCount,
	votersCount,
	isMultiple,
	expired,
	expiresAt,
}: PollVotingFooterProps) => {
	const displayVotes =
		votesCount === 1 ? `${votesCount} vote` : `${votesCount} votes`;

	const displayVoters =
		votersCount === 1 ? `${votersCount} voter` : `${votersCount} voters`;

	return (
		<View className="mt-2 flex-row opacity-80">
			{isMultiple ? (
				<ThemeText>{`${displayVotes} from ${displayVoters}`}</ThemeText>
			) : (
				<ThemeText>{displayVotes}</ThemeText>
			)}
			<ThemeText className="mx-2">▸</ThemeText>
			<ThemeText>
				{expired ? 'Closed' : `${formatTimeLeft(expiresAt)}`}
			</ThemeText>
		</View>
	);
};

export default memo(PollVotingFooter);
