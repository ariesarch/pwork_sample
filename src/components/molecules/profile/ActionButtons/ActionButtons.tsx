import React from 'react';
import { View, Pressable, ViewProps } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { MessageDotsIcon } from '@/util/svg/icon.profile';
import { useColorScheme } from 'nativewind';

type ActionButtonsProps = {
	hasIcon?: boolean;
	name: string;
};

const ActionButtons = ({ hasIcon, name, ...props }: ActionButtonsProps & ViewProps) => {
	const { colorScheme } = useColorScheme();

	return (
		<View className="flex-row items-center justify-center" {...props}>
			{hasIcon && (
				<Pressable className="w-8 h-8 rounded-full items-center justify-center border-[1px] border-gray-600 mr-2">
					<MessageDotsIcon {...{ colorScheme }} />
				</Pressable>
			)}
			<Pressable className="w-20 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 dark:bg-white">
				<ThemeText className="text-white dark:text-patchwork-dark-100 text-[13px]">
					{name}
				</ThemeText>
			</Pressable>
		</View>
	);
};

export default ActionButtons;
