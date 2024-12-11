import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { HomeStackScreenProps } from '@/types/navigation';
import {
	BackHandler,
	RefreshControl,
	ScrollView,
	TextInput,
	View,
} from 'react-native';
import { useFeedRepliesQuery } from '@/hooks/queries/feed.queries';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {
	BottomBarHeight,
	useGradualAnimation,
} from '@/hooks/custom/useGradualAnimation';
import ReplyActionBar from '@/components/molecules/compose/ReplyActionBar/ReplyActionBar';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import FeedDetailStatus from '@/components/atoms/feed/FeedDetailStatus/FeedDetailStatus';
import FeedReplyTextInput from '@/components/atoms/compose/FeedReplyTextInput/FeedReplyTextInput';
import useFeedItemResolver from '@/hooks/custom/useFeedItemResolver';
import { ComposeStatusProvider } from '@/context/composeStatusContext/composeStatus.context';
import { LinkCard } from '@/components/atoms/compose/LinkCard/LinkCard';
import { CheckRelationshipQueryKey } from '@/types/queries/profile.type';
import { useCheckRelationships } from '@/hooks/queries/profile.queries';
import ImageCard from '@/components/atoms/compose/ImageCard/ImageCard';
import UserSuggestionReply from '@/components/atoms/compose/UserSuggestionReply/UserSuggestionReply';
import ReplyStatus from '@/components/organisms/feed/ReplyStatus/ReplyStatus';
import { useStatusReplyStore } from '@/store/compose/statusReply/statusReplyStore';
import _ from 'lodash';
import PollForm from '@/components/organisms/compose/PollForm/PollForm';
import ReplyPollForm from '@/components/organisms/compose/ReplyPollForm/ReplyPollForm';
import { useFocusEffect } from '@react-navigation/native';

const FeedDetail = ({
	navigation,
	route,
}: HomeStackScreenProps<'FeedDetail'>) => {
	const domain_name = useSelectedDomain();
	const { id, openKeyboardAtMount } = route.params;
	const { height, progress } = useGradualAnimation();
	const feedDetail = useFeedItemResolver(id);
	const inputRef = useRef<TextInput>(null);
	const { currentFocusStatus } = useStatusReplyStore();
	const [isRefreshing, setIsRefreshing] = useState(false);

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

	const {
		data: statusReplies,
		isLoading: isLoadingReplies,
		isFetching,
		refetch: refetchReplies,
	} = useFeedRepliesQuery({
		domain_name,
		id,
	});

	const isNestedNodeInclude = useMemo(() => {
		return (
			statusReplies &&
			statusReplies?.descendants?.some(item => {
				return item?.in_reply_to_id && item?.in_reply_to_id !== feedDetail?.id;
			})
		);
	}, [statusReplies]);

	const handleRefresh = () => {
		setIsRefreshing(true);
		refetchReplies();
		_.delay(() => setIsRefreshing(false), 1500);
	};

	// ***** Check Relationship To Other Accounts ***** //
	const relationshipQueryKey: CheckRelationshipQueryKey = [
		'check-relationship-to-other-accounts',
		{
			accountIds: [
				feedDetail && feedDetail.account.id,
				feedDetail && feedDetail.account.id,
			],
		},
	];

	const { data: relationships, isSuccess } =
		useCheckRelationships(relationshipQueryKey);
	// ***** Check Relationship To Other Accounts ***** //

	return (
		<SafeScreen>
			<ComposeStatusProvider type={'reply'}>
				{!!feedDetail && (
					<View className="flex-1">
						<Header title="Post" leftCustomComponent={<BackButton />} />

						<FlatList
							data={statusReplies?.descendants}
							renderItem={({ item, index }) => {
								const nextItem = statusReplies?.descendants[index + 1];
								return (
									<ReplyStatus
										status={item}
										feedDetailId={feedDetail.id}
										nextStatus={nextItem}
										isNestedNodeInclude={isNestedNodeInclude}
									/>
								);
							}}
							keyExtractor={item => item.id.toString()}
							ListHeaderComponent={() => (
								<FeedDetailStatus
									feedDetail={feedDetail as Pathchwork.Status}
									relationships={isSuccess ? relationships : []}
								/>
							)}
							showsVerticalScrollIndicator={false}
							refreshControl={
								<RefreshControl
									refreshing={isRefreshing}
									tintColor={customColor['patchwork-light-900']}
									onRefresh={handleRefresh}
								/>
							}
						/>
						{!statusReplies && isLoadingReplies && (
							<View className="flex items-center flex-1">
								<Flow size={25} color={customColor['patchwork-red-50']} />
							</View>
						)}
						<Animated.View className={'p-2'} style={inputBarBgColorStyle}>
							<Animated.View className={'flex-row'} style={replyActionBarStyle}>
								<ThemeText className="mb-2 ml-1 normal-case text-xs opacity-80">
									Replying to ▸
								</ThemeText>
								<ThemeText variant="textOrange" className="mb-2 ml-1 text-xs">
									@{currentFocusStatus?.account?.acct}
								</ThemeText>
							</Animated.View>
							<Animated.View style={replyActionBarStyle}>
								<ReplyPollForm />
								<LinkCard composeType="reply" />
								<ImageCard composeType="reply" />
								<UserSuggestionReply />
							</Animated.View>
							<FeedReplyTextInput
								username={feedDetail.account.username}
								progress={progress}
								autoFocus={!!openKeyboardAtMount}
							/>
							<Animated.View style={replyActionBarStyle}>
								<ReplyActionBar
									feedDetailStatus={feedDetail}
									inputRef={inputRef}
									feedDetailId={feedDetail.id}
								/>
							</Animated.View>
						</Animated.View>
						<Animated.View style={virtualKeyboardContainerStyle} />
					</View>
				)}
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default FeedDetail;
