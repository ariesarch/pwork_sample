import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

const MenuOptionIcon = ({
	icon,
	name,
	disabled,
}: {
	icon: ReactNode;
	name: string;
	disabled?: boolean;
}) => {
	return (
		<View className="flex-row items-center">
			<View className="w-9 h-9 items-center justify-center">{icon}</View>
			<ThemeText
				size={'fs_15'}
				variant={disabled ? 'textGrey' : 'default'}
				className="font-SourceSans3_Medium ml-1"
			>
				{name}
			</ThemeText>
		</View>
	);
};

export default MenuOptionIcon;
