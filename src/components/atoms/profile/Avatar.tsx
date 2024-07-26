import React from 'react';
import { FastImageProps } from 'react-native-fast-image';
import Image from '../common/Image/Image';

type AvatarProps = {
	src: string;
	size?: number;
};

const Avatar = ({ src, size = 20, ...props }: AvatarProps & FastImageProps) => {
	return (
		<Image
			uri={src}
      {...props}
		/>
	);
};

export default Avatar;
