import React from 'react';
import { View, Pressable, ViewProps } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { MessageDotsIcon } from '@/util/svg/icon.profile';
import { useColorScheme } from 'nativewind';

type ActionButtonsProps = {
	hasIcon?: boolean;
};

const ActionButtons = ({ hasIcon }: ActionButtonsProps & ViewProps) => {
	const { colorScheme } = useColorScheme();

	return (
		<View className="flex-row items-center justify-center absolute right-3 top-3">
			{hasIcon && (
				<Pressable className="w-8 h-8 rounded-full items-center justify-center border-[1px] border-gray-600 mr-2">
					<MessageDotsIcon {...{ colorScheme }} />
				</Pressable>
			)}
			<Pressable className="w-20 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 dark:bg-white">
				<ThemeText className="text-white dark:text-patchwork-dark-100 text-[13px]">
					Follow
				</ThemeText>
			</Pressable>
		</View>
	);
};

export default ActionButtons;
