import React, { useState } from 'react';
import { View, Image as RNImage, Platform } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface ImageProps {
	uri?: string | number;
	resizeMode?: FastImageProps['resizeMode'];
	styleNW?: string;
}

const Image: React.FC<ImageProps> = ({ uri = '', styleNW, resizeMode }) => {
	const [loading, setLoading] = useState(false);

	const isRemoteUrl = typeof uri === 'string';
	const imageUrl = isRemoteUrl ? uri : RNImage.resolveAssetSource(uri).uri;

	const onLoadStart = () => setLoading(true);
	const onLoadEnd = () => setLoading(false);

	return (
		<View>
			<FastImage
				className={`w-full h-full ${styleNW}`}
				source={{
					uri: imageUrl || '',
					priority: FastImage.priority.high,
					cache: FastImage.cacheControl.immutable,
				}}
				resizeMode={resizeMode}
				onLoadStart={onLoadStart}
				onLoadEnd={onLoadEnd}
				fallback={Platform.OS === 'android'}
			/>
		</View>
	);
};

export default Image;
