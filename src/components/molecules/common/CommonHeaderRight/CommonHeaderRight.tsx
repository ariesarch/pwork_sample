import React from 'react';
import { View, Pressable } from 'react-native';
import { EllipsisIcon, SearchIconInProfile } from '@/util/svg/icon.profile';
import styles from './CommonHeaderRight.style';

const CommonHeaderRight = () => {
	return (
		<View className="flex-row items-center gap-2">
			<Pressable className={styles.iconContainer}>
				<SearchIconInProfile />
			</Pressable>
			<Pressable className={styles.iconContainer}>
				<EllipsisIcon />
			</Pressable>
		</View>
	);
};

export default CommonHeaderRight;
