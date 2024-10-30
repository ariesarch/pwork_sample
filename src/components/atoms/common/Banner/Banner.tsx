import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import { FastImageProps } from 'react-native-fast-image';
import { Blurhash } from 'react-native-blurhash';
import { Image } from 'react-native';

interface BannerTranslationStyleProps {
	transform: {
		translateY: number;
	}[];
}
interface BannerAnimatedScaleStyleProps {
	transform: (
		| {
				scaleY: number;
				scaleX?: undefined;
		  }
		| {
				scaleX: number;
				scaleY?: undefined;
		  }
	)[];
}
interface BannerProps {
	source: string | undefined;
	bannerHeight: SharedValue<number>;
	bannerTranslationStyle?: BannerTranslationStyleProps;
	animatedScaleStyle: BannerAnimatedScaleStyleProps;
	blurStyle?: {
		opacity: number;
	};
	blurhash?: string;
}

const Banner = ({
	source,
	bannerHeight,
	bannerTranslationStyle,
	animatedScaleStyle,
	blurStyle,
	blurhash,
}: BannerProps & FastImageProps) => {
	const { width } = useWindowDimensions();
	return (
		<Animated.View style={[StyleSheet.absoluteFill, bannerTranslationStyle]}>
			<Animated.View
				onLayout={e => (bannerHeight.value = e.nativeEvent.layout.height)}
				style={animatedScaleStyle}
			>
				<View>
					<Animated.View
						style={[
							StyleSheet.absoluteFill,
							{ backgroundColor: 'rgba(0,0,0,0.5)' },
							blurStyle,
						]}
					/>
					{blurhash ? (
						<Blurhash blurhash={blurhash} className="h-36" style={{ width }} />
					) : (
						<Image
							source={{ uri: source }}
							className="h-36"
							style={{ width }}
						/>
					)}
				</View>
			</Animated.View>
		</Animated.View>
	);
};

export default Banner;
