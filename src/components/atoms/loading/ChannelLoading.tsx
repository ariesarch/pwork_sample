import React from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Image } from 'react-native-svg';
import { ThemeText } from '../common/ThemeText/ThemeText';
import customColor from '@/util/constant/color';

const ChannelLoading = ({
	title,
	cardCount = 1,
}: {
	title: string;
	cardCount?: number;
}) => {
	return (
		<View style={{ flex: 1 }}>
			<ThemeText className="font-bold my-2 flex-1" size="lg_18">
				{title}
			</ThemeText>
			<SkeletonPlaceholder
				backgroundColor={customColor['skeleton-bg']}
				speed={1200}
				highlightColor={customColor['skeleton-highlight']}
			>
				<SkeletonPlaceholder.Item>
					{Array(cardCount)
						.fill('')
						.map((_, index) => {
							return (
								<SkeletonPlaceholder.Item
									key={index}
									width={'100%'}
									height={240}
									borderRadius={8}
									marginRight={11}
									marginBottom={20}
									overflow="hidden"
								/>
							);
						})}
				</SkeletonPlaceholder.Item>
			</SkeletonPlaceholder>
		</View>
	);
};

export default ChannelLoading;
