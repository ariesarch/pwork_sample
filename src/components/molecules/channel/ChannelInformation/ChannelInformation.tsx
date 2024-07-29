import { View, Text } from 'react-native';
import React from 'react';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { CalendarIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';

const ChannelInformation = () => {
	const { colorScheme } = useColorScheme();
	return (
		<View className='p-4'>
			<ThemeText className='font-bold'>Channel information</ThemeText>
			<ThemeText className='my-3 leading-[18px]'>
				Lorem ipsum dolor sit amet consectetur. Ut nisi etiam sapien nec tortor
				molestie duis. Molestie eget purus turpis nec. Risus viverra vestibulum
				pretium quisque eget rhoncus sed lorem.
			</ThemeText>
			<View>
				<ThemeText className='font-semibold'>This is a heading</ThemeText>
				<ThemeText className='my-3 leading-[18px]'>
					Congue consequat et eget eget vel varius enim sed. In adipiscing
					vehicula ut pretium.
				</ThemeText>
			</View>
			<View>
				<ThemeText className='font-semibold'>Another heading</ThemeText>
				<ThemeText className='my-3 leading-[18px]'>
					Id sapien cras nulla tincidunt bibendum dolor maecenas ac vulputate.
					Ultrices in et nulla nulla sem dictum in viverra sollicitudin.
					Interdum molestie mauris faucibus facilisis.
				</ThemeText>
			</View>
			<View className='flex-row items-center'>
				<CalendarIcon {...{ colorScheme }} />
				<ThemeText className='ml-2'>
					Created 13th June 2024 by{' '}
					<ThemeText className="text-patchwork-red-50">@username</ThemeText>
				</ThemeText>
			</View>
		</View>
	);
};

export default ChannelInformation;
