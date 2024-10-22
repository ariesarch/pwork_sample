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
import { Blurhash } from 'react-native-blurhash';

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
						<Blurhash
							blurhash={blurhash}
							style={{ width: '100%', height: '100%' }}
						/>
					) : (
						<Image source={source} className="h-36" style={{ width }} />
					)}
				</View>
			</Animated.View>
		</Animated.View>
	);
};

export default Banner;
