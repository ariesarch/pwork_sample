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
import HorizontalScrollMenu from '@/components/organisms/channel/HorizontalScrollMenu/HorizontalScrollMenu';
import useHandleOnPressStatus from '@/hooks/custom/useHandleOnPressStatus';
import ChannelAbout from '@/components/organisms/channel/ChannelAbout/ChannelAbout';

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
	const queryParams = {
		domain_name,
		account_id: id,
	};
	const {
		data: timeline,
		hasNextPage,
		fetchNextPage,
		isFetching,
	} = useAccountDetailFeed(queryParams);

	const timelineList = timeline ? flattenPages(timeline) : [];

	const feed = useMemo(() => flattenPages(timeline), [timeline]);

	const handleOnPressStatus = useHandleOnPressStatus(feed, navigation, [
		'account-detail-feed',
		queryParams,
	]);

	const onTimelineContentLoadMore = () => {
		if (hasNextPage && activeTab === 0) {
			return fetchNextPage();
		}
	};

	return (
		<ScrollProvider>
			<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
				{timeline ? (
					<>
						<FeedTitleHeader title={timelineList[0]?.account?.display_name} />
						<Tabs.Container
							renderHeader={() => {
								return (
									<CollapsibleFeedHeader
										type="Profile"
										profile={timelineList[0]?.account}
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
											fontWeight: 'bold',
											textTransform: 'capitalize',
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
									renderItem={({ item }) => (
										<StatusItem
											handleOnPress={() => {
												handleOnPressStatus(item.id);
											}}
											status={item}
										/>
									)}
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
							</Tabs.Tab>
							<Tabs.Tab name="Replies">
								<Tabs.ScrollView>
									<View className="flex-1 items-center justify-center">
										<ThemeText>No Status Found</ThemeText>
									</View>
								</Tabs.ScrollView>
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
