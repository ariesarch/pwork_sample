import React from 'react';
import { Image } from '@/components/atoms';
import { FastImageProps } from 'react-native-fast-image';

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
