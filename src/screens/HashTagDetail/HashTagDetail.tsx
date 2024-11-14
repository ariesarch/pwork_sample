import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { Button } from '@/components/atoms/common/Button/Button';
import Header from '@/components/atoms/common/Header/Header';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useHashtagDetailFeedQuery } from '@/hooks/queries/feed.queries';
import { useHashTagDetailQuery } from '@/hooks/queries/hashtag.queries';
import { HomeStackScreenProps } from '@/types/navigation';
import { calculateHashTagCount } from '@/util/helper/helper';
import { flattenPages } from '@/util/helper/timeline';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { CircleFade } from 'react-native-animated-spinkit';

const HashTagDetail: React.FC<HomeStackScreenProps<'HashTagDetail'>> = ({
	route,
	navigation,
}) => {
	const { hashtag, hashtagDomain: domain_name } = route.params;

	const {
		data: timeline,
		hasNextPage,
		fetchNextPage,
		isFetching,
	} = useHashtagDetailFeedQuery({
		domain_name,
		hashtag,
	});

	const { data: hashtagDetail } = useHashTagDetailQuery({
		domain_name,
		hashtag,
	});

	const onTimelineContentLoadMore = () => {
		if (hasNextPage) {
			return fetchNextPage();
		}
	};

	const totalPosts = useMemo(() => {
		if (hashtagDetail)
			return calculateHashTagCount(hashtagDetail.history, 'uses');
	}, [hashtagDetail]);

	const totalParticipant = useMemo(() => {
		if (hashtagDetail) {
			return calculateHashTagCount(hashtagDetail.history, 'accounts');
		}
	}, [hashtagDetail]);

	const getTodayPostCount = (hashtag: Pathchwork.HashtagHistory) => {
		const date = dayjs.unix(parseInt(hashtag.day));
		const isToday = date.isSame(dayjs(), 'day');
		if (isToday) {
			return hashtag.uses;
		}
		return 0;
	};

	return (
		<SafeScreen>
			<Header
				title={`#${hashtag}`}
				leftCustomComponent={
					<BackButton
						customOnPress={() => {
							navigation.goBack();
						}}
					/>
				}
			/>
			{hashtagDetail && (
				<FlashList
					data={flattenPages(timeline)}
					keyExtractor={item => item.id}
					renderItem={({ item }) => {
						return <StatusItem status={item} />;
					}}
					ListHeaderComponent={() => {
						return (
							<View className="flex-row m-4">
								<View className="flex-1">
									<ThemeText
										size="md_16"
										className="font-bold"
									>{`#${hashtagDetail.name}`}</ThemeText>
									<View className="flex-row">
										<ThemeText
											variant="textGrey"
											size="xs_12"
											className="font-bold mr-2"
										>{`${totalPosts} posts`}</ThemeText>
										<ThemeText
											variant="textGrey"
											size="xs_12"
											className="font-bold mr-2"
										>{`${totalParticipant} participants`}</ThemeText>
										<ThemeText
											variant="textGrey"
											size="xs_12"
											className="font-bold"
										>{`${getTodayPostCount(
											hashtagDetail.history[0],
										)} posts today`}</ThemeText>
									</View>
								</View>
								<Button variant={'outline'}>
									<ThemeText>Follow</ThemeText>
								</Button>
							</View>
						);
					}}
					estimatedItemSize={500}
					estimatedListSize={{
						height: Dimensions.get('screen').height,
						width: Dimensions.get('screen').width,
					}}
					onEndReachedThreshold={0.15}
					onEndReached={onTimelineContentLoadMore}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={
						isFetching ? (
							<View className="my-3 items-center">
								<CircleFade size={25} color="white" />
							</View>
						) : (
							<></>
						)
					}
				/>
			)}
		</SafeScreen>
	);
};

export default HashTagDetail;
