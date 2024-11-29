import React from 'react';
import { View } from 'react-native';
import { POLL_LIMITS } from '@/util/constant/pollOption';
import { usePollState } from '@/hooks/custom/compose/usePollState';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { Button } from '@/components/atoms/common/Button/Button';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import PollDuration from '@/components/molecules/compose/Poll/PollDuration';
import PollOption from '@/components/molecules/compose/Poll/PollOption';
import PollType from '@/components/molecules/compose/Poll/PollType';

const PollForm = () => {
	const { composeState } = useComposeStatus();

	const {
		options,
		duration,
		isMultiple,
		addOption,
		removeOption,
		updateOption,
		handleDurationSelect,
		handleTypeChange,
	} = usePollState();

	if (!composeState.poll) return null;

	return (
		<View className="px-5 pt-2 pb-4 mt-4 border border-patchwork-dark-50 rounded-lg">
			<View className="mt-3">
				{options.map((option, index) => (
					<PollOption
						key={index}
						value={option}
						index={index}
						canRemove={options.length > POLL_LIMITS.MIN_OPTIONS}
						onChangeText={updateOption}
						onRemove={removeOption}
					/>
				))}
				{/* Add Poll Option */}
				<View className="items-start">
					<Button
						variant="outline"
						className="rounded-2xl"
						size="sm"
						disabled={options.length === POLL_LIMITS.MAX_OPTIONS}
						onPress={addOption}
					>
						<ThemeText size="xs_12" className="text-center">
							Add Option
						</ThemeText>
					</Button>
				</View>
				{/* Add Poll Option */}

				<View className="flex-row justify-between mt-3">
					<PollType
						selectedType={isMultiple}
						handleTypeChange={handleTypeChange}
					/>
					<PollDuration
						selectedDuration={duration}
						handleDurationSelect={handleDurationSelect}
					/>
				</View>
			</View>
		</View>
	);
};

export default PollForm;
