import React, { useState } from 'react';
import { Image, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Blurhash } from 'react-native-blurhash';
import type { ImageStyle } from 'react-native-fast-image';
import type { StyleProp } from 'react-native';
import customColor from '@/util/constant/color';

export interface Props {
	url: string;
	blurHash?: string;
	imageStyle?: StyleProp<ImageStyle>;
	setImageDimensions?: React.Dispatch<
		React.SetStateAction<{
			width: number;
			height: number;
		}>
	>;
}

const ThemeImage = ({
	url,
	blurHash,
	imageStyle,
	setImageDimensions,
}: Props) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const imageOnLoad = () => {
		setImageLoaded(true);
		if (setImageDimensions && url) {
			Image.getSize(url, (width, height) =>
				setImageDimensions({ width, height }),
			);
		}
	};

	const blurhashView = () => {
		if (!imageLoaded) {
			if (blurHash) {
				return (
					<Blurhash
						decodeAsync
						blurhash={blurHash}
						style={[{ position: 'absolute' }, imageStyle]}
					/>
				);
			}
		}
	};

	return (
		<View className="rounded-tl-lg rounded-tr-lg overflow-hidden">
			<FastImage
				source={{
					uri: url,
				}}
				style={[
					imageStyle,
					{ backgroundColor: customColor['patchwork-dark-50'] },
				]}
				onLoad={imageOnLoad}
			/>
			{blurhashView()}
		</View>
	);
};

export default ThemeImage;
