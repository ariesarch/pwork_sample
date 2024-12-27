import React, { memo, useRef, useState } from 'react';
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
	isFeedDetail?: boolean;
}

const ThemeImage = memo(
	({ url, blurHash, imageStyle, isFeedDetail }: Props) => {
		const [imageLoaded, setImageLoaded] = useState(false);

		const imageOnLoad = () => {
			setImageLoaded(true);
		};

		return (
			<>
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
				{blurHash && !imageLoaded && !isFeedDetail && (
					<BlueHashComponent blurHash={blurHash} imageStyle={imageStyle} />
				)}
			</>
		);
	},
);

const BlueHashComponent = ({
	blurHash,
	imageStyle,
}: {
	blurHash: string;
	imageStyle: StyleProp<ImageStyle>;
}) => {
	return (
		<Blurhash
			decodeAsync
			blurhash={blurHash}
			style={[{ position: 'absolute' }, imageStyle]}
		/>
	);
};

export default ThemeImage;
