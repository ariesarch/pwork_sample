import { View, Text } from 'react-native';
import React from 'react';
import { useColorScheme } from 'nativewind';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import InputFieldName from '@/components/atoms/common/InputFieldName/InputFieldName';
import Checkbox from '@/components/atoms/common/Checkbox/Checkbox';
import StatusTypeCheckBox from '@/components/atoms/channel/StatusTypeCheckBox/StatusTypeCheckBox';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { Button } from '@/components/atoms/common/Button/Button';
import ContributorProfile from '@/components/molecules/channel/ContributorProfile/ContributorProfile';
import { mockUserList } from '@/mock/feed/statusList';

const ChannelAddContentForm = () => {
	const { colorScheme } = useColorScheme();
	return (
		<View>
			<ThemeText className="font-semibold" size={'md_16'}>
				Add content
			</ThemeText>
			<ThemeText variant={'textGrey'}>
				Lorem ipsum dolor sit amet consectetur. Fermentum ac proin sed elementum
				erat.
			</ThemeText>
			<View className="border border-slate-300 dark:border-gray-600 p-4 my-8">
				<InputFieldName title="Channel hashtags" />
				<ThemeText variant={'textGrey'} className="mb-4">
					Add the hashtags used to bring posts into your channel.
				</ThemeText>
				<InputFieldName title="Hashtag" isRequired />
				<TextInput startIcon={<ThemeText>#</ThemeText>} styleNW="mt-3" />
				<TextInput startIcon={<ThemeText>#</ThemeText>} styleNW="mt-3" />
				<Button variant={'outline'} className="rounded-3xl mt-5" size="xl">
					<ThemeText>Add another</ThemeText>
				</Button>
			</View>
			<View className="border border-slate-300 dark:border-gray-600 p-4 my-8">
				<InputFieldName title="Channel Contributor (5)" />
				<ContributorProfile account={mockUserList[0]} />
			</View>
		</View>
	);
};

export default ChannelAddContentForm;
