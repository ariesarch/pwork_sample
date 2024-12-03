import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { SectionListWithHeaders } from '@codeherence/react-native-header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { statusListData } from '@/mock/feed/statusList';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import { useColorScheme } from 'nativewind';
import ProfileInfo from '@/components/organisms/profile/ProfileInfo';
import CommonHeader from '@/components/molecules/common/CommonHeader/CommonHeader';
import { useAccountDetailFeed } from '@/hooks/queries/feed.queries';
import { HomeStackScreenProps } from '@/types/navigation';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { flattenPages } from '@/util/helper/timeline';
import { ProfileBackIcon } from '@/util/svg/icon.profile';
import ChannelProfileLoading from '@/components/atoms/loading/ChannelProfileLoading';
import { useNavigation } from '@react-navigation/native';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
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
import { useAccountInfo } from '@/hooks/queries/profile.queries';
import { AccountInfoQueryKey } from '@/types/queries/profile.type';

const ProfileOther: React.FC<HomeStackScreenProps<'ProfileOther'>> = ({
	route,
	navigation,
}) => {
	const { colorScheme } = useColorScheme();
	const { bottom, top } = useSafeAreaInsets();
	const [activeTab, setActiveTab] = useState(0);
	const { id } = route.params;
	const domain_name = useSelectedDomain();
	const barColor = useAppropiateColorHash('patchwork-dark-100');
	const tabBarTextColor = useAppropiateColorHash(
		'patchwork-light-900',
		'patchwork-dark-100',
	);

	// ***** Get Account Info ***** //
	const acctInfoQueryKey: AccountInfoQueryKey = ['get_account_info', { id }];

	const { data: accountInfoData } = useAccountInfo(acctInfoQueryKey);
	// ***** Get Account Info ***** //

	const {
		data: timeline,
		hasNextPage,
		fetchNextPage,
		refetch: refreshProfileTimeline,
		isFetching,
	} = useAccountDetailFeed({
		domain_name,
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
		domain_name,
		account_id: id,
		exclude_replies: false,
		exclude_reblogs: true,
		exclude_original_statuses: true,
	});

	const timelineList = timeline ? flattenPages(timeline) : [];

	const onTimelineContentLoadMore = () => {
		if (hasNextPage && activeTab === 0) {
			return fetchNextPage();
		}
	};

	const handleRefresh = () => {
		refreshProfileTimeline();
	};

	const onReplyFeedLoadMore = () => {
		if (hasNextReplies && activeTab == 1) {
			return fetchReplies();
		}
	};

	return (
		<ScrollProvider>
			<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
				{timeline && accountInfoData ? (
					<>
						<FeedTitleHeader title={accountInfoData.display_name} />
						<Tabs.Container
							renderHeader={() => {
								return (
									<CollapsibleFeedHeader
										type="Profile"
										profile={accountInfoData}
									/>
								);
							}}
							minHeaderHeight={Platform.OS == 'ios' ? 100 : 60}
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
										return <StatusWrapper status={item} />;
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
										return item.in_reply_to_id ? (
											<StatusWrapper status={item} />
										) : (
											<></>
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
