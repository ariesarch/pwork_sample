import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

const MenuOptionIcon = ({ icon, name }: { icon: ReactNode; name: string }) => {
	return (
		<View className="flex-row items-center">
			<View className="w-9 h-9 items-center justify-center">{icon}</View>
			<ThemeText size={'fs_15'} className="font-SourceSans3_Medium ml-1">
				{name}
			</ThemeText>
		</View>
	);
};

export default MenuOptionIcon;
