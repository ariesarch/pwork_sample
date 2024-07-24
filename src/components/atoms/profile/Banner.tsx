import React from 'react';
import { ImageBackground, ImageSourcePropType } from 'react-native';

type BannerProps = {
  source: ImageSourcePropType | undefined
};

const Banner = ({ source }: BannerProps) => {
  return (
    <ImageBackground
      source={source}
      resizeMode='cover'
      className="h-36"
    />
  );
};

export default Banner;
