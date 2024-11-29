import React, { memo } from 'react';
import { View, LayoutAnimation, Pressable } from 'react-native';
import Animated, {
	useAnimatedStyle,
	withSpring,
} from 'react-native-reanimated';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import PollVotingOptionIcon from '@/components/atoms/poll/PollVotingOptionIcon/PollVotingOptionIcon';
import { PollRadioCheckedIcon } from '@/util/svg/icon.common';

interface PollVotingOptionProps {
	poll: Pathchwork.Poll;
	title: string;
	votesCount: number;
	isSelected: boolean;
	handleOptionSelect: () => void;
	showResults: boolean;
	optionIndex: number;
}

const PollVotingOption = ({
	poll,
	title,
	votesCount,
	isSelected,
	handleOptionSelect,
	showResults,
	optionIndex,
}: PollVotingOptionProps) => {
	const pollVotesCount = poll.voters_count || poll.votes_count;
	const hasOwnVotes = poll.own_votes.includes(optionIndex);

	const percentage =
		pollVotesCount === 0 ? 0 : (votesCount / pollVotesCount) * 100;

	const progressStyle = useAnimatedStyle(() => ({
		width: withSpring(`${percentage}%`, { damping: 10 }),
	}));

	const onPressOptionSelect = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		handleOptionSelect();
	};

	if (showResults) {
		return (
			<View className="py-1">
				<View className="relative justify-center overflow-hidden py-2 rounded-lg bg-patchwork-dark-50">
					<Animated.View
						className={`absolute top-0 left-0 bottom-0 bg-patchwork-red-50`}
						style={progressStyle}
					/>
					<View className="flex-row items-center justify-between px-3">
						<View className="flex-row items-center w-11/12">
							{hasOwnVotes && (
								<PollRadioCheckedIcon fill="#FFFFFF" className="mr-2" />
							)}
							<ThemeText className="ml-1 flex-1">{title}</ThemeText>
						</View>
						<ThemeText size={'fs_13'}>{Math.round(percentage)}%</ThemeText>
					</View>
				</View>
			</View>
		);
	}

	return (
		<Pressable onPress={onPressOptionSelect}>
			<View className="py-1">
				<View className="relative py-1">
					<View className="flex-row items-center">
						<PollVotingOptionIcon
							type={
								poll.multiple
									? isSelected
										? 'checkboxSolid'
										: 'checkboxOutline'
									: isSelected
									? 'radioChecked'
									: 'radioOutline'
							}
						/>
						<ThemeText className="ml-2 flex-1">{title}</ThemeText>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default memo(PollVotingOption);
