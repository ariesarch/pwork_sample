import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from '@/components/atoms';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { ChevronRightIcon } from '@/util/svg/icon.common';
import styles from './Card.style';

interface CardProps {
	imageSource: string | number | undefined;
	title: string;
	activeNow?: boolean;
	onPress: () => void;
}

const Card = ({ imageSource, activeNow, title, onPress }: CardProps) => {
	return (
		<View className="my-1">
			{activeNow && <View className={styles.activeNow} />}
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				className="rounded-[4px] overflow-hidden shadow-lg mr-3"
			>
				<Image uri={imageSource} />
			</TouchableOpacity>
			<View className={styles.cardFooter}>
				<ThemeText>{title}</ThemeText>
				<ChevronRightIcon />
			</View>
		</View>
	);
};

export default Card;
