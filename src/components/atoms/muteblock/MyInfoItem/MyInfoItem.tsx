import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { ChevronRightIcon } from '@/util/svg/icon.common';

type Props = {
	icon?: React.ReactNode;
	label: string;
	value?: string;
	onPress?: () => void;
	actionComponent?: React.ReactElement;
};

const MyInfoItem: React.FC<Props> = ({ icon, label, onPress, value }) => {
	return (
		<Pressable
			className="flex-row mx-5 my-2 active:opacity-90"
			onPress={onPress}
		>
			<View className="flex-1 flex-row items-center">
				{icon}
				<ThemeText className="ml-3">{label}</ThemeText>
			</View>
			<View className="flex-1 flex-row justify-end items-center active:opacity-80">
				<ThemeText className="mr-3">{value || 'None'}</ThemeText>
				<ChevronRightIcon width={14} height={14} className="mt-[1]" />
			</View>
		</Pressable>
	);
};

export default MyInfoItem;
