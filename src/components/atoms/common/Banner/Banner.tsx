import React from 'react';
import {
	ImageSourcePropType,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import { FastImageProps } from 'react-native-fast-image';
import Image from '../Image/Image';

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
	source: ImageSourcePropType | undefined;
	bannerHeight: SharedValue<number>;
	bannerTranslationStyle?: BannerTranslationStyleProps;
	animatedScaleStyle: BannerAnimatedScaleStyleProps;
	blurStyle?: {
		opacity: number;
	};
}

const Banner = ({
	source,
	bannerHeight,
	bannerTranslationStyle,
	animatedScaleStyle,
	blurStyle,
}: BannerProps & FastImageProps) => {
	const { width } = useWindowDimensions();

	return (
		<Animated.View
			style={[
				StyleSheet.absoluteFill,
				bannerTranslationStyle,
				{ paddingBottom: 20, backgroundColor: 'red' },
			]}
		>
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

					<Image source={source} className="h-36" style={{ width }} />
				</View>
			</Animated.View>
		</Animated.View>
	);
};

export default Banner;
