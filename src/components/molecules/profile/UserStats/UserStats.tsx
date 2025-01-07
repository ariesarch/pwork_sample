import React from 'react';
import { View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { formatNumber } from '@/util/helper/helper';
import { useNavigation } from '@react-navigation/native';
import { CommonCompositeNavigationProp } from '@/types/navigation';

type UserStatsProps = {
	posts: number;
	following: number;
	followers: number;
	isMainChannel?: boolean;
	accountId: string;
};

const UserStats = ({
	posts,
	following,
	followers,
	isMainChannel,
	accountId,
	...props
}: UserStatsProps & ViewProps) => {
	const navigation = useNavigation<CommonCompositeNavigationProp>();

	return (
		<View className="flex-row px-4 pt-3 gap-3" {...props}>
			<ThemeText className="font-SourceSans3_SemiBold">
				{formatNumber(posts)}{' '}
				<ThemeText className="font-SourceSans3_Regular text-patchwork-grey-400">
					Posts
				</ThemeText>
			</ThemeText>
			<ThemeText
				className="font-SourceSans3_SemiBold"
				onPress={() => {
					navigation.push('FollowingAccounts', {
						accountId,
						isMainChannel,
					});
				}}
			>
				{formatNumber(following)}{' '}
				<ThemeText className="font-SourceSans3_Regular text-patchwork-grey-400">
					Following
				</ThemeText>
			</ThemeText>
			<ThemeText
				className="font-SourceSans3_SemiBold"
				onPress={() => {
					navigation.push('FollowerAccounts', {
						accountId,
						isMainChannel,
					});
				}}
			>
				{formatNumber(followers)}{' '}
				<ThemeText className="font-SourceSans3_Regular text-patchwork-grey-400">
					Followers
				</ThemeText>
			</ThemeText>
		</View>
	);
};

export default UserStats;
