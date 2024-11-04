import React from 'react';
import { View, Pressable } from 'react-native';
import { EllipsisIcon, SearchIconInProfile } from '@/util/svg/icon.profile';
import styles from './CommonHeaderRight.style';
import { useColorScheme } from 'nativewind';

const CommonHeaderRight = () => {
	const { toggleColorScheme } = useColorScheme();
	return (
		<View className="flex-row items-center gap-2">
			<Pressable className="w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 opacity-50">
				<SearchIconInProfile />
			</Pressable>
			<Pressable
				className="w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 opacity-50"
				onPress={toggleColorScheme}
			>
				<EllipsisIcon />
			</Pressable>
		</View>
	);
};

export default CommonHeaderRight;
