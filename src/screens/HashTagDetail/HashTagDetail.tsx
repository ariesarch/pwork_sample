import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { Button } from '@/components/atoms/common/Button/Button';
import Header from '@/components/atoms/common/Header/Header';
import ListEmptyComponent from '@/components/atoms/common/ListEmptyComponent/ListEmptyComponent';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import HashtagHeader from '@/components/molecules/feed/HashtagHeader/HashtagHeader';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import StatusWrapper from '@/components/organisms/feed/StatusWrapper/StatusWrapper';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useHashtagFollowMutation } from '@/hooks/mutations/feed.mutation';
import { useHashtagDetailFeedQuery } from '@/hooks/queries/feed.queries';
import { useHashTagDetailQuery } from '@/hooks/queries/hashtag.queries';
import { HomeStackScreenProps } from '@/types/navigation';
import { DEFAULT_API_URL } from '@/util/constant';
import customColor from '@/util/constant/color';
import { calculateHashTagCount } from '@/util/helper/helper';
import { flattenPages } from '@/util/helper/timeline';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Dimensions, RefreshControl, View } from 'react-native';
import { CircleFade, Flow } from 'react-native-animated-spinkit';

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
		refetch: refetchHashTagFeed,
	} = useHashtagDetailFeedQuery({
		domain_name,
		hashtag,
	});

	const { data: hashtagDetail, refetch: refetchHashTagDetail } =
		useHashTagDetailQuery({
			domain_name: process.env.API_URL ?? DEFAULT_API_URL,
			hashtag,
		});

	const onTimelineContentLoadMore = () => {
		if (hasNextPage) {
			return fetchNextPage();
		}
	};

	const handleRefresh = () => {
		refetchHashTagFeed();
		refetchHashTagDetail();
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
			{hashtagDetail && timeline ? (
				<FlashList
					data={flattenPages(timeline)}
					keyExtractor={item => item.id}
					renderItem={({ item }) => {
						return (
							<StatusWrapper
								status={item}
								currentPage="Hashtag"
								statusType={item.reblog ? 'reblog' : 'normal'}
								extraPayload={{ hashtag, domain_name }}
							/>
						);
					}}
					ListHeaderComponent={() => (
						<HashtagHeader hashtagDetail={hashtagDetail} hashtag={hashtag} />
					)}
					ListEmptyComponent={() => (
						<ListEmptyComponent title="No Hashtag Found" />
					)}
					refreshControl={
						<RefreshControl
							refreshing={isFetching}
							tintColor={customColor['patchwork-light-900']}
							onRefresh={handleRefresh}
						/>
					}
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
			) : (
				<View className="flex-1 items-center justify-center">
					<Flow size={50} color={customColor['patchwork-red-50']} />
				</View>
			)}
		</SafeScreen>
	);
};

export default HashTagDetail;
