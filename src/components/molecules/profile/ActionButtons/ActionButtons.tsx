import React from 'react';
import { View, Pressable, ViewProps } from 'react-native';
import { MessageDotsIcon } from '@/util/svg/icon.profile';
import { useColorScheme } from 'nativewind';
import Chip from '@/components/atoms/common/Chip/Chip';

type ActionButtonsProps = {
	hasIcon?: boolean;
	name: string;
};

const ActionButtons = ({
	hasIcon,
	name,
	...props
}: ActionButtonsProps & ViewProps) => {
	const { colorScheme } = useColorScheme();

	return (
		<View className='absolute -top-9 right-4'>
			<View className="flex-row items-center justify-center" {...props}>
				{hasIcon && (
					<Pressable className="w-8 h-8 rounded-full items-center justify-center border-[1px] border-gray-600 mr-2">
						<MessageDotsIcon {...{ colorScheme }} />
					</Pressable>
				)}
				<Chip
					title={name}
					className="py-[6] px-[21]"
					variant={'white'}
				/>
			</View>
		</View>
	);
};

export default ActionButtons;
