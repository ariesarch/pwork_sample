import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { HomeStackScreenProps } from '@/types/navigation';
import { View } from 'react-native';
import {
	useFeedDetailQuery,
	useFeedRepliesQuery,
} from '@/hooks/queries/feed.queries';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { useMemo, useState } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { PagedResponse } from '@/util/helper/timeline';
import { FlatList } from 'react-native-gesture-handler';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {
	BottomBarHeight,
	useGradualAnimation,
} from '@/hooks/custom/useGradualAnimation';
import ReplyActionBar from '@/components/molecules/compose/ReplyActionBar/ReplyActionBar';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import FeedDetailStatus from '@/components/atoms/feed/FeedDetailStatus/FeedDetailStatus';
import FeedReplyTextInput from '@/components/atoms/compose/FeedReplyTextInput/FeedReplyTextInput';

const FeedDetail = ({
	navigation,
	route,
}: HomeStackScreenProps<'FeedDetail'>) => {
	const queryClient = useQueryClient();
	const domain_name = useSelectedDomain();
	const { id, selectedFeedIndex, queryKey } = route.params;
	const { height, progress } = useGradualAnimation();

	const inputBarActiveBgColor = useAppropiateColorHash(
		'patchwork-dark-400',
		'patchwork-light-50',
	);
	const inputBarInactiveBgColor = useAppropiateColorHash(
		'patchwork-dark-100',
		'patchwork-light-900',
	);

	const virtualKeyboardContainerStyle = useAnimatedStyle(() => {
		return {
			height:
				height.value > BottomBarHeight ? height.value - BottomBarHeight : 0,
		};
	});

	const replyActionBarStyle = useAnimatedStyle(() => ({
		opacity: progress.value,
		height: progress.value < 0.5 ? 0 : 'auto',
	}));

	const inputBarBgColorStyle = useAnimatedStyle(() => ({
		backgroundColor:
			progress.value > 0.5 ? inputBarActiveBgColor : inputBarInactiveBgColor,
	}));

	const { data: fetchedFeedDetail } = useFeedDetailQuery({
		domain_name,
		id,
		options: {
			enabled: !selectedFeedIndex,
		},
	});

	const { data: statusReplies, isLoading: isLoadingReplies } =
		useFeedRepliesQuery({
			domain_name,
			id,
		});

	const cachedTimeline:
		| InfiniteData<PagedResponse<Pathchwork.Status[]>>
		| undefined = queryKey ? queryClient.getQueryData(queryKey) : undefined;

	const cachedFeedDetail = useMemo(() => {
		if (selectedFeedIndex !== undefined && cachedTimeline) {
			const cachedFeeds = cachedTimeline.pages.flatMap(page => page.data);
			return cachedFeeds[selectedFeedIndex];
		}
	}, [selectedFeedIndex, cachedTimeline]);

	const feedDetail = useMemo(
		() => cachedFeedDetail ?? fetchedFeedDetail,
		[cachedFeedDetail, fetchedFeedDetail],
	);

	return (
		<SafeScreen>
			{feedDetail ? (
				<View className="flex-1">
					<Header title="Post" leftCustomComponent={<BackButton />} />
					<FlatList
						data={statusReplies?.ancestors}
						renderItem={({ item }) => (
							<StatusItem handleOnPress={() => {}} status={item} />
						)}
						keyExtractor={item => item.id.toString()}
						ListHeaderComponent={() => (
							<FeedDetailStatus feedDetail={feedDetail as Pathchwork.Status} />
						)}
					/>
					<Animated.View className={'p-2'} style={inputBarBgColorStyle}>
						<Animated.View className={'flex-row'} style={replyActionBarStyle}>
							<ThemeText className="mb-2 ml-1 normal-case text-xs opacity-80">
								Replying to ▸
							</ThemeText>
							<ThemeText variant="textOrange" className="mb-2 ml-1 text-xs">
								@{feedDetail.account.username}
							</ThemeText>
						</Animated.View>
						<FeedReplyTextInput
							username={feedDetail.account.username}
							progress={progress}
						/>
						<Animated.View style={replyActionBarStyle}>
							<ReplyActionBar />
						</Animated.View>
					</Animated.View>
					<Animated.View style={virtualKeyboardContainerStyle} />
				</View>
			) : (
				<View className="flex items-center justify-center flex-1">
					<Flow size={50} color={customColor['patchwork-red-50']} />
				</View>
			)}
		</SafeScreen>
	);
};

export default FeedDetail;
