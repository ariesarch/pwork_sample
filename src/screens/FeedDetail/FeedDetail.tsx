import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import Underline from '@/components/atoms/common/Underline/Underline';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { HomeStackScreenProps } from '@/types/navigation';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
import { useKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, {
	interpolate,
	runOnJS,
	useAnimatedReaction,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import {
	BottomBarHeight,
	useGradualAnimation,
} from '@/hooks/custom/useGradualAnimation';
import ComposeActionsBar from '@/components/molecules/compose/ComposeActionsBar/ComposeActionsBar';
import ReplyActionBar from '@/components/molecules/compose/ReplyActionBar/ReplyActionBar';
import { cn } from '@/util/helper/twutil';

const FeedDetail = ({
	navigation,
	route,
}: HomeStackScreenProps<'FeedDetail'>) => {
	const queryClient = useQueryClient();
	const domain_name = useSelectedDomain();
	const { id, selectedFeedIndex, queryKey } = route.params;
	const { height, progress } = useGradualAnimation();
	const [isKeyboardOpen, setKeyboardOpen] = useState(false);
	const [reply, setReply] = useState('');

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

	// useAnimatedReaction(
	// 	() => progress.value,
	// 	currentVal => {
	// 		if (currentVal == 1) {
	// 			return runOnJS(setKeyboardOpen)(true);
	// 		} else {
	// 			return runOnJS(setKeyboardOpen)(false);
	// 		}
	// 	},
	// );

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
					<View className="flex-1">
						<Header title="Post" leftCustomComponent={<BackButton />} />
						<FlatList
							data={statusReplies?.ancestors}
							renderItem={({ item }) => (
								<StatusItem handleOnPress={() => {}} status={item} />
							)}
							keyExtractor={item => item.id.toString()}
							ListHeaderComponent={() =>
								renderHeader(feedDetail as Pathchwork.Status)
							}
						/>
						<View
							className={cn(
								'p-2',
								isKeyboardOpen
									? 'bg-patchwork-light-50 dark:bg-patchwork-dark-400'
									: '',
							)}
						>
							{/* bg-patchwork-light-50 dark:bg-patchwork-dark-400 */}
							<Animated.View className={'flex-row'} style={replyActionBarStyle}>
								<ThemeText className="mb-2 ml-1 normal-case text-xs opacity-80">
									Replying to ▸
								</ThemeText>
								<ThemeText variant="textOrange" className="mb-2 ml-1 text-xs">
									@{feedDetail.account.username}
								</ThemeText>
							</Animated.View>
							<TextInput
								selectionColor={customColor['patchwork-red-50']}
								placeholder={
									isKeyboardOpen
										? 'Type your reply'
										: `Reply to ${feedDetail.account.username}`
								}
								onChangeText={setReply}
							/>
							<Animated.View style={replyActionBarStyle}>
								<ReplyActionBar />
							</Animated.View>
						</View>
						<Animated.View style={virtualKeyboardContainerStyle} />
					</View>
				</View>
			) : (
				<View className="flex items-center justify-center flex-1">
					<Flow size={50} color={customColor['patchwork-red-50']} />
				</View>
			)}
		</SafeScreen>
	);
};

const renderHeader = (feedDetail: Pathchwork.Status) => {
	return (
		<View>
			<View className="mx-4">
				<StatusHeader
					status={feedDetail}
					imageSize="w-8 h-8"
					showAvatarIcon
					showFollowIcon
				/>
				<StatusContent status={feedDetail} className="mt-2" />
				<StatusActionBar status={feedDetail} />
			</View>
			<Underline className="mt-3" />
			<ThemeText className="font-semibold ml-4 my-2">Replies</ThemeText>
			<Underline />
		</View>
	);
};

export default FeedDetail;
