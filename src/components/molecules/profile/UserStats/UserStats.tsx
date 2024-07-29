import React from 'react';
import { View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

type UserStatsProps = {
	posts: string | number;
	following: string | number;
	followers: string | number;
};

const UserStats = ({
	posts,
	following,
	followers,
	...props
}: UserStatsProps & ViewProps) => {
	return (
		<View className="flex-row px-4 pt-3 gap-3" {...props}>
			<ThemeText className='font-semibold'>
				{posts} <ThemeText className="opacity-50 font-normal">Posts</ThemeText>
			</ThemeText>
			<ThemeText className='font-semibold'>
				{following} <ThemeText className="opacity-50 font-normal">Following</ThemeText>
			</ThemeText>
			<ThemeText className='font-semibold'>
				{followers} <ThemeText className="opacity-50 font-normal">Followers</ThemeText>
			</ThemeText>
		</View>
	);
};

export default UserStats;
