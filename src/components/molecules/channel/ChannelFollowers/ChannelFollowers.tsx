import { View, Text } from 'react-native';
import React from 'react';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Avatar from '@/components/atoms/profile/Avatar';

const ChannelFollowers = ({ followers }: { followers: string | number }) => {
	return (
		<View className="flex-row items-center mt-2">
			<Avatar
				src={require('@/assets/images/channel/followers_img_1.png')}
				className="h-8 w-20 mr-2"
			/>
			<ThemeText className="font-semibold">
				{followers}
				<ThemeText className="opacity-50 font-normal"> Followers</ThemeText>
			</ThemeText>
		</View>
	);
};

export default ChannelFollowers;
