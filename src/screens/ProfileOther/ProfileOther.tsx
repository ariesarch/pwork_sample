import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { useAccountDetailFeed } from '@/hooks/queries/feed.queries';
import { HomeStackScreenProps } from '@/types/navigation';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { flattenPages } from '@/util/helper/timeline';
import { ProfileBackIcon } from '@/util/svg/icon.profile';
import ChannelProfileLoading from '@/components/atoms/loading/ChannelProfileLoading';
import { CircleFade } from 'react-native-animated-spinkit';
import ChannelBannerLoading from '@/components/atoms/loading/ChannelBannerLoading';
import { ScrollProvider } from '@/context/sharedScrollContext/sharedScroll.context';
import FeedTitleHeader from '@/components/atoms/feed/FeedTitleHeader/FeedTitleHeader';
import {
	MaterialTabBar,
	MaterialTabItem,
	Tabs,
} from 'react-native-collapsible-tab-view';
import CollapsibleFeedHeader from '@/components/atoms/feed/CollapsibleFeedHeader/CollapsibleFeedHeader';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import customColor from '@/util/constant/color';
import { RefreshControl } from 'react-native';
import StatusWrapper from '@/components/organisms/feed/StatusWrapper/StatusWrapper';
import {
	useAccountInfo,
	useCheckRelationships,
	useSpecificServerProfile,
} from '@/hooks/queries/profile.queries';
import { AccountInfoQueryKey } from '@/types/queries/profile.type';
import ListEmptyComponent from '@/components/atoms/common/ListEmptyComponent/ListEmptyComponent';
import { DEFAULT_API_URL } from '@/util/constant';

const ProfileOther: React.FC<HomeStackScreenProps<'ProfileOther'>> = ({
	route,
	navigation,
}) => {
	const { colorScheme } = useColorScheme();
	const { bottom, top } = useSafeAreaInsets();
	const [activeTab, setActiveTab] = useState(0);
	const { id, isFromNoti, isOwnChannelFeed } = route.params;
	const domain_name = useSelectedDomain();
	const barColor = useAppropiateColorHash('patchwork-dark-100');
	const tabBarTextColor = useAppropiateColorHash(
		'patchwork-light-900',
		'patchwork-dark-100',
	);

	// ***** Get Account Info ***** //
	const acctInfoQueryKey: AccountInfoQueryKey = [
		'get_account_info',
		{ id, domain_name: isFromNoti ? DEFAULT_API_URL : domain_name },
	];

	const { data: accountInfoData, refetch: refetchAccountInfo } =
		useAccountInfo(acctInfoQueryKey);
	// ***** Get Account Info ***** //

	// ***** Get Specific Server Profile ***** //
	const { data: specificServerProfile } = useSpecificServerProfile({
		q: accountInfoData?.url as string,
		options: {
			enabled: !!accountInfoData?.url,
		},
	});
	// ***** Get Specific Server Profile ***** //

	// ***** Check Relationship To Other Accounts ***** //
	const { data: relationships, refetch: refetchRelationships } =
		useCheckRelationships({
			accountIds: [
				specificServerProfile?.accounts[0]?.id,
				specificServerProfile?.accounts[0]?.id,
			],
			options: {
				enabled: !!specificServerProfile?.accounts[0]?.id,
			},
		});
	// ***** Check Relationship To Other Accounts ***** //

	const {
		data: timeline,
		hasNextPage,
		fetchNextPage,
		refetch: refreshProfileTimeline,
		isFetching,
	} = useAccountDetailFeed({
		domain_name: isFromNoti ? DEFAULT_API_URL : domain_name,
		account_id: id,
		exclude_reblogs: false,
		exclude_replies: true,
		exclude_original_statuses: false,
	});

	const {
		data: replies,
		hasNextPage: hasNextReplies,
		fetchNextPage: fetchReplies,
		isFetching: isFetchingReplies,
		refetch: refetchReplies,
	} = useAccountDetailFeed({
		domain_name: isFromNoti ? DEFAULT_API_URL : domain_name,
		account_id: id,
		exclude_replies: false,
		exclude_reblogs: true,
		exclude_original_statuses: true,
	});

	const onTimelineContentLoadMore = () => {
		if (hasNextPage && activeTab === 0) {
			return fetchNextPage();
		}
	};

	const handleRefresh = () => {
		refreshProfileTimeline();
		refetchAccountInfo();
		refetchRelationships();
	};

	const onReplyFeedLoadMore = () => {
		if (hasNextReplies && activeTab == 1) {
			return fetchReplies();
		}
	};

	return (
		<ScrollProvider>
			<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
				{timeline && accountInfoData && relationships ? (
					<>
						<FeedTitleHeader title={accountInfoData.display_name} />
						<Tabs.Container
							renderHeader={() => {
								return (
									<CollapsibleFeedHeader
										type="Profile"
										profile={accountInfoData}
										specifyServerAccId={specificServerProfile?.accounts[0]?.id}
										otherUserId={id} // To invalidate query for specificServerProfile
										relationships={relationships}
										isMainChannel={isFromNoti}
										isOwnChannelFeed={isOwnChannelFeed}
									/>
								);
							}}
							minHeaderHeight={Platform.OS == 'ios' ? 100 : 60}
							tabBarHeight={400}
							containerStyle={{ flex: 1 }}
							renderTabBar={props => {
								return (
									<MaterialTabBar
										keepActiveTabCentered
										{...props}
										indicatorStyle={{
											backgroundColor: tabBarTextColor,
											maxWidth: 180,
											marginHorizontal: 12,
										}}
										style={{
											backgroundColor: barColor,
										}}
										TabItemComponent={props => (
											<MaterialTabItem
												{...props}
												labelStyle={props.labelStyle}
												pressColor="#fff0"
												label={props.label}
												android_ripple={{
													color: '#fff0',
												}}
											/>
										)}
										activeColor={tabBarTextColor}
										labelStyle={{
											fontFamily: 'SourceSans3-Bold',
											textTransform: 'capitalize',
											fontSize: 15,
										}}
										inactiveColor={customColor['patchwork-grey-400']}
									/>
								);
							}}
						>
							<Tabs.Tab name="Posts">
								<Tabs.FlashList
									data={flattenPages(timeline)}
									contentContainerStyle={{
										paddingBottom: bottom,
										backgroundColor:
											colorScheme === 'dark' ? '#2E363B' : '#ffffff',
									}}
									keyExtractor={item => item.id.toString()}
									renderItem={({ item }) => {
										return item.in_reply_to_id ? (
											<></>
										) : (
											<StatusWrapper
												status={item}
												comeFrom={isFromNoti ? 'noti' : 'other'}
												currentPage="ProfileOther"
												statusType={item.reblog ? 'reblog' : 'normal'}
											/>
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
									ListEmptyComponent={<ListEmptyComponent className="mt-10" />}
									ListFooterComponent={
										isFetching ? (
											<View className="my-3 items-center">
												<CircleFade size={25} color="white" />
											</View>
										) : (
											<></>
										)
									}
									refreshControl={
										<RefreshControl
											refreshing={isFetching}
											tintColor={customColor['patchwork-light-900']}
											onRefresh={handleRefresh}
										/>
									}
								/>
							</Tabs.Tab>
							<Tabs.Tab name="Replies">
								<Tabs.FlashList
									data={flattenPages(replies)}
									contentContainerStyle={{
										paddingBottom: bottom,
										backgroundColor:
											colorScheme === 'dark' ? '#2E363B' : '#ffffff',
									}}
									keyExtractor={item => item.id.toString()}
									renderItem={({ item }) => {
										return (
											<StatusWrapper
												status={item}
												comeFrom={isFromNoti ? 'noti' : 'other'}
												currentPage="ProfileOther"
												statusType={item.reblog ? 'reblog' : 'normal'}
											/>
										);
									}}
									refreshControl={
										<RefreshControl
											className="mt-1"
											refreshing={isFetchingReplies}
											tintColor={customColor['patchwork-light-900']}
											onRefresh={() => {
												refetchReplies();
											}}
										/>
									}
									estimatedItemSize={500}
									estimatedListSize={{
										height: Dimensions.get('screen').height,
										width: Dimensions.get('screen').width,
									}}
									onEndReachedThreshold={0.15}
									ListEmptyComponent={() => {
										return (
											<ListEmptyComponent
												title="No Replies Found"
												className="mt-10"
											/>
										);
									}}
									onEndReached={onReplyFeedLoadMore}
									showsVerticalScrollIndicator={false}
									ListFooterComponent={
										isFetchingReplies ? (
											<View className="my-3 items-center">
												<CircleFade size={25} color="white" />
											</View>
										) : (
											<></>
										)
									}
								/>
							</Tabs.Tab>
						</Tabs.Container>
					</>
				) : (
					<View className="flex-1">
						<View style={{ flex: 1 }}>
							<ChannelBannerLoading />
						</View>
						<View style={{ position: 'absolute', top }}>
							<TouchableOpacity
								onPress={() => navigation.canGoBack() && navigation.goBack()}
								className="w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-50 ml-4 mb-3"
							>
								<ProfileBackIcon />
							</TouchableOpacity>
						</View>
						<View style={{ marginTop: 130 }}>
							<ChannelProfileLoading />
						</View>
					</View>
				)}
			</View>
		</ScrollProvider>
	);
};

export default ProfileOther;
