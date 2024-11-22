import { memo, useCallback, useState, useRef, useMemo } from 'react';
import {
	View,
	TouchableOpacity,
	StatusBar,
	Dimensions,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { FlashListWithHeaders } from '@codeherence/react-native-header';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import CommonHeader from '@/components/molecules/common/CommonHeader/CommonHeader';
import ChannelProfileHeaderInfo from '@/components/organisms/channel/ChannelProfileHeaderInfo/ChannelProfileHeaderInfo';
import {
	BottomStackParamList,
	HomeStackParamList,
	HomeStackScreenProps,
} from '@/types/navigation';
import ChannelProfileLoading from '@/components/atoms/loading/ChannelProfileLoading';
import {
	useGetChannelAbout,
	useGetChannelAdditionalInfo,
	useGetChannelFeed,
} from '@/hooks/queries/channel.queries';
import { flattenPages } from '@/util/helper/timeline';
import {
	useFocusEffect,
	useNavigation,
	CompositeNavigationProp,
	useScrollToTop,
} from '@react-navigation/native';
import {
	EllipsisIcon,
	ProfileBackIcon,
	SearchIconInProfile,
} from '@/util/svg/icon.profile';
import { CircleFade } from 'react-native-animated-spinkit';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import { Platform } from 'react-native';
import ChannelBannerLoading from '@/components/atoms/loading/ChannelBannerLoading';
import ChannelListHeaderTabs from '@/components/organisms/channel/ChannelListHeaderTabs/ChannelListHeaderTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import useHandleOnPressStatus from '@/hooks/custom/useHandleOnPressStatus';
import {
	MaterialTabBar,
	MaterialTabItem,
	Tabs,
} from 'react-native-collapsible-tab-view';
import CollapsibleFeedHeader from '@/components/atoms/feed/CollapsibleFeedHeader/CollapsibleFeedHeader';
import FeedTitleHeader from '@/components/atoms/feed/FeedTitleHeader/FeedTitleHeader';
import { ScrollProvider } from '@/context/sharedScrollContext/sharedScroll.context';
import customColor from '@/util/constant/color';
import ChannelAbout from '@/components/organisms/channel/ChannelAbout/ChannelAbout';
import HorizontalScrollMenu from '@/components/organisms/channel/HorizontalScrollMenu/HorizontalScrollMenu';

type ChannelProfileScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<BottomStackParamList, 'Home'>,
	StackNavigationProp<HomeStackParamList, 'ChannelProfile'>
>;

const ChannelProfile: React.FC<HomeStackScreenProps<'ChannelProfile'>> = ({
	route,
	navigation,
}) => {
	const { colorScheme } = useColorScheme();
	const { bottom, top } = useSafeAreaInsets();
	const { domain_name, channel_info } = route.params;
	const queryParams = {
		domain_name,
		remote: false,
		only_media: false,
	};
	const {
		data: timeline,
		hasNextPage,
		fetchNextPage,
		isFetching,
	} = useGetChannelFeed(queryParams);

	const { data: channelAbout } = useGetChannelAbout(domain_name);

	const { data: chanelAdditionalInfo } =
		useGetChannelAdditionalInfo(domain_name);

	const barColor = useAppropiateColorHash('patchwork-dark-100');
	const tabBarTextColor = useAppropiateColorHash(
		'patchwork-light-900',
		'patchwork-dark-100',
	);

	const feed = useMemo(() => flattenPages(timeline), [timeline]);

	const handleOnPressStatus = useHandleOnPressStatus(feed, navigation, [
		'channel-feed',
		queryParams,
	]);

	const onTimelineContentLoadMore = () => {
		if (hasNextPage) {
			return fetchNextPage();
		}
	};

	useFocusEffect(
		useCallback(() => {
			if (Platform.OS === 'android') {
				StatusBar.setTranslucent(true);
				StatusBar.setBackgroundColor('transparent');
			}
		}, [barColor]),
	);

	return (
		<ScrollProvider>
			<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
				{channelAbout && timeline ? (
					<>
						<FeedTitleHeader title={channel_info.channel_name} />
						<Tabs.Container
							renderHeader={() => {
								return (
									<CollapsibleFeedHeader
										type="Channel"
										channel={channelAbout}
										channelInfo={channel_info}
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
												className="font-"
												label={props.label}
												android_ripple={{
													color: '#fff0',
												}}
											/>
										)}
										activeColor={tabBarTextColor}
										labelStyle={{
											textTransform: 'capitalize',
											fontFamily: 'SourceSans3-Bold',
										}}
										inactiveColor={customColor['patchwork-grey-400']}
									/>
								);
							}}
						>
							<Tabs.Tab name="Posts">
								<Tabs.FlashList
									data={feed}
									contentContainerStyle={{
										paddingBottom: bottom,
										backgroundColor:
											colorScheme === 'dark' ? '#2E363B' : '#ffffff',
									}}
									ListHeaderComponent={<HorizontalScrollMenu />}
									keyExtractor={item => item.id.toString()}
									renderItem={({ item }) => (
										<StatusItem
											handleOnPress={() => handleOnPressStatus(item.id)}
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
							<Tabs.Tab name="About">
								<Tabs.ScrollView>
									{chanelAdditionalInfo && (
										<ChannelAbout
											channelAbout={channelAbout}
											channelAdditionalInfo={chanelAdditionalInfo}
										/>
									)}
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

export default ChannelProfile;
