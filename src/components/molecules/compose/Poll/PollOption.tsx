import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { DeletePollOptionIcon } from '@/util/svg/icon.compose';

interface PollOptionProps {
	value: string;
	index: number;
	canRemove: boolean;
	onChangeText: (text: string, index: number) => void;
	onRemove: (index: number) => void;
}

const PollOption = ({
	value,
	index,
	canRemove,
	onChangeText,
	onRemove,
}: PollOptionProps) => {
	return (
		<View className="flex-row items-center mb-3">
			<TextInput
				extraContainerStyle="flex-1"
				placeholder={`Option ${index + 1}`}
				value={value}
				onChangeText={text => onChangeText(text, index)}
			/>
			{canRemove && (
				<TouchableOpacity onPress={() => onRemove(index)} className="ml-3">
					<DeletePollOptionIcon />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default PollOption;
