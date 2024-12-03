import React from 'react';
import { View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { formatUserStatsNumber } from '@/util/helper/helper';

type UserStatsProps = {
	posts: number;
	following: number;
	followers: number;
};

const UserStats = ({
	posts,
	following,
	followers,
	...props
}: UserStatsProps & ViewProps) => {
	return (
		<View className="flex-row px-4 pt-3 gap-3" {...props}>
			<ThemeText className="font-SourceSans3_SemiBold">
				{formatUserStatsNumber(posts)}{' '}
				<ThemeText className="font-SourceSans3_Regular text-patchwork-grey-400">
					Posts
				</ThemeText>
			</ThemeText>
			<ThemeText className=" font-SourceSans3_SemiBold">
				{formatUserStatsNumber(following)}{' '}
				<ThemeText className="font-SourceSans3_Regular text-patchwork-grey-400">
					Following
				</ThemeText>
			</ThemeText>
			<ThemeText className=" font-SourceSans3_SemiBold">
				{formatUserStatsNumber(followers)}{' '}
				<ThemeText className="font-SourceSans3_Regular text-patchwork-grey-400">
					Followers
				</ThemeText>
			</ThemeText>
		</View>
	);
};

export default UserStats;
