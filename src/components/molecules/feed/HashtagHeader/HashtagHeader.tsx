import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { calculateHashTagCount } from '@/util/helper/helper';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/atoms/common/Button/Button';
import { useHashtagFollowMutation } from '@/hooks/mutations/feed.mutation';
import Toast from 'react-native-toast-message';
import { useHashTagDetailQuery } from '@/hooks/queries/hashtag.queries';
import { DEFAULT_API_URL } from '@/util/constant';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { queryClient } from '@/App';

interface HashtagHeaderProps {
	hashtagDetail: Patchwork.HashtagDetail;
	hashtag: string;
}

const HashtagHeader: React.FC<HashtagHeaderProps> = ({
	hashtagDetail,
	hashtag,
}) => {
	const { mutate, isPending } = useHashtagFollowMutation({
		onSuccess: response => {
			queryClient.setQueryData(
				[
					'hashtag-detail',
					{ domain_name: process.env.API_URL ?? DEFAULT_API_URL, hashtag },
				],
				response,
			);
		},
		onError: e => {
			Toast.show({
				type: 'errorToast',
				text1: e.message,
				position: 'top',
				topOffset: 50,
			});
		},
	});

	const totalPosts = useMemo(() => {
		if (hashtagDetail)
			return calculateHashTagCount(hashtagDetail.history, 'uses');
	}, [hashtagDetail]);

	const totalParticipant = useMemo(() => {
		if (hashtagDetail) {
			return calculateHashTagCount(hashtagDetail.history, 'accounts');
		}
	}, [hashtagDetail]);

	const getTodayPostCount = (hashtag: Patchwork.HashtagHistory) => {
		const date = dayjs.unix(parseInt(hashtag.day));
		const isToday = date.isSame(dayjs(), 'day');
		if (isToday) {
			return hashtag.uses;
		}
		return 0;
	};

	const handleFollowPress = () => {
		mutate({ hashtag, isAlreadyFollowing: !!hashtagDetail?.following });
	};

	return (
		<View className="flex-row m-4">
			<View className="flex-1">
				<ThemeText size="md_16" className="font-SourceSans3_Bold">
					{`#${hashtagDetail.name}`}
				</ThemeText>
				<View className="flex-row">
					<ThemeText
						variant="textGrey"
						size="xs_12"
						className="font-SourceSans3_Bold mr-2"
					>
						{`${totalPosts} posts`}
					</ThemeText>
					<ThemeText
						variant="textGrey"
						size="xs_12"
						className="font-SourceSans3_Bold mr-2"
					>
						{`${totalParticipant} participants`}
					</ThemeText>
					<ThemeText
						variant="textGrey"
						size="xs_12"
						className="font-SourceSans3_Bold"
					>
						{`${getTodayPostCount(hashtagDetail.history[0])} posts today`}
					</ThemeText>
				</View>
			</View>
			<Button variant={'outline'} onPress={handleFollowPress}>
				{isPending ? (
					<Flow size={15} color={'white'} className="mx-3" />
				) : (
					<ThemeText>
						{hashtagDetail?.following ? 'Unfollow' : 'Follow'}
					</ThemeText>
				)}
			</Button>
		</View>
	);
};

export default HashtagHeader;
