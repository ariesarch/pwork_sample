import { View, Text } from 'react-native';
import React from 'react';
import { useColorScheme } from 'nativewind';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import InputFieldName from '@/components/atoms/common/InputFieldName/InputFieldName';
import Checkbox from '@/components/atoms/common/Checkbox/Checkbox';
import StatusTypeCheckBox from '@/components/atoms/channel/StatusTypeCheckBox/StatusTypeCheckBox';

const ChannelFilterContentForm = () => {
	const { colorScheme } = useColorScheme();
	return (
		<View>
			<ThemeText>Filter content</ThemeText>
			<ThemeText variant={'textGrey'}>
				Lorem ipsum dolor sit amet consectetur. Fermentum ac proin sed elementum
				erat.
			</ThemeText>
			<View className="border border-gray-400">
				<InputFieldName title="Type of posts" />
				<ThemeText variant={'textGrey'}>
					This selection will determine the type of content displayed within
					this channel.
				</ThemeText>
				<StatusTypeCheckBox title="Posts" />
				<StatusTypeCheckBox title="Reposts" />
				<StatusTypeCheckBox title="Replies" />
			</View>
		</View>
	);
};

export default ChannelFilterContentForm;
