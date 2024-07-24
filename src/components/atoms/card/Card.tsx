import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from '@/components/atoms';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { ChevronRight } from '@/util/svg/icon.common';
import styles from './Card.style';

interface CardProps {
	imageSource: string | number | undefined;
	title: string;
	onPress: () => void;
}

const Card = ({ imageSource, title, onPress }: CardProps) => {
	return (
		<>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				className="rounded-[4px] overflow-hidden shadow-lg mr-3"
			>
				<Image uri={imageSource} styleNW="w-36 h-36" />
			</TouchableOpacity>
			<View className={styles.cardFooter}>
				<ThemeText>{title}</ThemeText>
				<ChevronRight />
			</View>
		</>
	);
};

export default Card;
