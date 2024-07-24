import React, { useState } from 'react';
import { View, Image as RNImage, Platform, ViewProps } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface ImageProps {
	uri?: string | number;
	resizeMode?: FastImageProps['resizeMode'];
}

const Image = ({ uri = '', resizeMode, ...props }: ImageProps & FastImageProps) => {
	const [loading, setLoading] = useState(false);

	const isRemoteUrl = typeof uri === 'string';
	const imageUrl = isRemoteUrl ? uri : RNImage.resolveAssetSource(uri).uri;

	const onLoadStart = () => setLoading(true);
	const onLoadEnd = () => setLoading(false);

	return (
		<FastImage
			className='w-36 h-36'
			source={{
				uri: imageUrl || '',
				priority: FastImage.priority.high,
				cache: FastImage.cacheControl.immutable,
			}}
			resizeMode={resizeMode}
			onLoadStart={onLoadStart}
			onLoadEnd={onLoadEnd}
			fallback={Platform.OS === 'android'}
			{...props}
		/>
	);
};

export default Image;
