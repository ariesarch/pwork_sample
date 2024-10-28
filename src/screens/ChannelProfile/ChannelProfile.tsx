/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { memo, useCallback, useState, useRef, useMemo } from 'react';
import { View, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
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
	useGetChannelFeed,
} from '@/hooks/queries/channel.queries';
import { flattenPages } from '@/util/helper/timeline';
import {
	useFocusEffect,
	useNavigation,
	CompositeNavigationProp,
	useScrollToTop,
} from '@react-navigation/native';
import { ProfileBackIcon } from '@/util/svg/icon.profile';
import { CircleFade } from 'react-native-animated-spinkit';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import { Platform } from 'react-native';
import ChannelBannerLoading from '@/components/atoms/loading/ChannelBannerLoading';
import ChannelListHeaderTabs from '@/components/organisms/channel/ChannelListHeaderTabs/ChannelListHeaderTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import useHandleOnPressStatus from '@/hooks/custom/useHandleOnPressStatus';

type ChannelProfileScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<BottomStackParamList, 'Home'>,
	StackNavigationProp<HomeStackParamList, 'ChannelProfile'>
>;

const ChannelProfile: React.FC<HomeStackScreenProps<'ChannelProfile'>> = ({
	route,
}) => {
	const navigation = useNavigation<ChannelProfileScreenNavigationProp>();
	const flashListRef = useRef<any>(null);
	const { colorScheme } = useColorScheme();
	const { bottom, top } = useSafeAreaInsets();
	const { domain_name } = route.params;
	const {
		data: timeline,
		hasNextPage,
		fetchNextPage,
		isFetching,
	} = useGetChannelFeed({
		domain_name,
		remote: false,
		only_media: false,
	});

	const { data: channelAbout } = useGetChannelAbout(domain_name);
	const barColor = useAppropiateColorHash('patchwork-dark-100');

	const [activeTab, setActiveTab] = useState(0);

	const feed = useMemo(() => flattenPages(timeline), [timeline]);
	const items = useMemo(() => ['Header', ...feed], [feed]);
	const handleOnPressStatus = useHandleOnPressStatus(
		feed,
		navigation,
		'FeedDetail',
	);

	const onTimelineContentLoadMore = () => {
		if (hasNextPage && activeTab === 0) {
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

	const MemoizedStatusItem = memo(
		({
			status,
			handleOnPressStatus,
		}: {
			status: Pathchwork.Status;
			handleOnPressStatus: () => void;
		}) => {
			return <StatusItem status={status} handleOnPress={handleOnPressStatus} />;
		},
	);

	// to check again
	useScrollToTop(
		useRef({
			scrollToTop: () => {
				flashListRef.current?.scrollToOffset({ animated: true, offset: 0 });
			},
		}),
	);

	return (
		<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
			{timeline && channelAbout ? (
				<FlashListWithHeaders
					HeaderComponent={({ scrollY, showNavBar }) => {
						return (
							<CommonHeader
								scrollY={scrollY}
								showNavBar={showNavBar}
								bannerSrc={channelAbout?.contact.account.header}
								blurhash={channelAbout?.thumbnail?.blurhash}
								imageSrc={channelAbout?.thumbnail.url}
								avatarStyle="rounded-md -top-5 w-20 h-20 border-patchwork-dark-100 border-[2.56px]"
								channelName={channelAbout.title}
								handleOnPressHeader={() =>
									flashListRef?.current?.scrollToOffset({
										offset: 0,
										animated: true,
									})
								}
							/>
						);
					}}
					LargeHeaderComponent={() => (
						<ChannelProfileHeaderInfo channelAbout={channelAbout!} />
					)}
					ref={flashListRef}
					scrollEventThrottle={16}
					data={items}
					disableAutoFixScroll
					ignoreLeftSafeArea
					ignoreRightSafeArea
					headerFadeInThreshold={0.3}
					disableLargeHeaderFadeAnim
					contentContainerStyle={{
						paddingBottom: bottom,
						backgroundColor: colorScheme === 'dark' ? '#2E363B' : '#ffffff',
					}}
					keyExtractor={(item, index) =>
						typeof item === 'string' ? item : item.id.toString()
					}
					renderItem={({ item }) => {
						if (typeof item === 'string') {
							return (
								<ChannelListHeaderTabs
									activeTab={activeTab}
									handleOnPressTab={i => setActiveTab(i)}
									channelAbout={channelAbout}
								/>
							);
						} else {
							if (activeTab === 0) {
								return (
									<MemoizedStatusItem
										handleOnPressStatus={() => {
											handleOnPressStatus(item);
										}}
										status={item}
									/>
								);
							} else {
								return <></>;
							}
						}
					}}
					estimatedItemSize={100}
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
	);
};

export default ChannelProfile;
