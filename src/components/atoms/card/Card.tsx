import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { ChevronRightIcon } from '@/util/svg/icon.common';
import styles from './Card.style';
import Image from '../common/Image/Image';
import { ViewProps } from 'react-native';

interface CardProps {
	imageSource: string | number | undefined;
	title: string;
	activeNow?: boolean;
	onPress: () => void;
}

const Card = ({ imageSource, activeNow, title, onPress, ...props }: CardProps & ViewProps) => {
	return (
		<View className="my-1" >
			{activeNow && <View className={styles.activeNow} />}
			<TouchableOpacity
			{...props}
				activeOpacity={0.8}
				onPress={onPress}
				className="rounded-[4px] overflow-hidden shadow-lg bg-white mr-3"
			>
				<Image uri={imageSource} />
			</TouchableOpacity>
			<View className={styles.cardFooter}>
				<ThemeText className="text-white">{title}</ThemeText>
				<ChevronRightIcon />
			</View>
		</View>
	);
};

export default Card;
