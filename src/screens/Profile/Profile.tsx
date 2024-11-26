import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import { useColorScheme } from 'nativewind';
import { useAccountDetailFeed } from '@/hooks/queries/feed.queries';
import { HomeStackScreenProps } from '@/types/navigation';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { flattenPages } from '@/util/helper/timeline';
import { ProfileBackIcon } from '@/util/svg/icon.profile';
import ChannelProfileLoading from '@/components/atoms/loading/ChannelProfileLoading';
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
import useHandleOnPressStatus from '@/hooks/custom/useHandleOnPressStatus';

import { SocialMediaLink } from '@/components/organisms/profile/SocialLink/SocialLink';
import { useAuthStore } from '@/store/auth/authStore';
import { DEFAULT_API_URL } from '@/util/constant';
import { CircleFade, Flow } from 'react-native-animated-spinkit';
import SocialLink from '@/components/organisms/profile/SocialLink/SocialLink';
import { useProfileMutation } from '@/hooks/mutations/profile.mutation';
import { queryClient } from '@/App';
import { UpdateProfilePayload } from '@/types/queries/profile.type';
import { handleError } from '@/util/helper/helper';
const Profile: React.FC<HomeStackScreenProps<'Profile'>> = ({
	route,
	navigation,
}) => {
	const { colorScheme } = useColorScheme();
	const { bottom, top } = useSafeAreaInsets();
	const [activeTab, setActiveTab] = useState(0);
	const [socialLinkAction, setSocialLinkAction] = useState<{
		visible: boolean;
		formType: 'add' | 'edit';
	}>({ visible: false, formType: 'add' });
	const domain_name = useSelectedDomain();
	const {
		userInfo,
		actions: { setUserInfo },
	} = useAuthStore();
	const barColor = useAppropiateColorHash('patchwork-dark-100');
	const tabBarTextColor = useAppropiateColorHash(
		'patchwork-light-900',
		'patchwork-dark-100',
	);

	const {
		data: timeline,
		hasNextPage,
		fetchNextPage,
		isFetching,
	} = useAccountDetailFeed({
		domain_name: process.env.API_URL ?? DEFAULT_API_URL,
		account_id: userInfo?.id!,
	});
	const timelineList = timeline ? flattenPages(timeline) : [];
	const feed = useMemo(() => flattenPages(timeline), [timeline]);
	const handleOnPressStatus = useHandleOnPressStatus(feed, navigation, [
		'account-detail-feed',
		{
			domain_name,
			account_id: userInfo?.id!,
		},
	]);

	const onTimelineContentLoadMore = () => {
		if (hasNextPage && activeTab === 0) {
			return fetchNextPage();
		}
	};

	const handleAddSocialLink = async (
		link: SocialMediaLink,
		username: string,
	) => {
		setSocialLinkAction({ visible: false, formType: 'add' });
		if (timelineList.length > 0) {
			const updatedProfile: UpdateProfilePayload = {
				fields_attributes: {
					0: {
						name: 'Twitter',
						value:
							link.title === 'Twitter' && username
								? username
								: timelineList[0]?.account?.fields?.find(
										v => v.name === 'Twitter',
								  )?.value || '',
					},
					1: {
						name: 'Instagram',
						value:
							link.title === 'Instagram' && username
								? username
								: timelineList[0]?.account?.fields?.find(
										v => v.name === 'Instagram',
								  )?.value || '',
					},
					2: {
						name: 'Linkedin',
						value:
							link.title === 'Linkedin' && username
								? username
								: timelineList[0]?.account?.fields?.find(
										v => v.name === 'Linkedin',
								  )?.value || '',
					},
					3: {
						name: 'Youtube',
						value:
							link.title === 'Youtube' && username
								? username
								: timelineList[0]?.account?.fields?.find(
										v => v.name === 'Youtube',
								  )?.value || '',
					},
					4: {
						name: 'Facebook',
						value:
							link.title === 'Facebook' && username
								? username
								: timelineList[0]?.account?.fields?.find(
										v => v.name === 'Facebook',
								  )?.value || '',
					},
					5: {
						name: 'Reddit',
						value:
							link.title === 'Reddit' && username
								? username
								: timelineList[0]?.account?.fields?.find(
										v => v.name === 'Reddit',
								  )?.value || '',
					},
					6: {
						name: 'TikTok',
						value:
							link.title === 'TikTok' && username
								? username
								: timelineList[0]?.account?.fields?.find(
										v => v.name === 'TikTok',
								  )?.value || '',
					},
					7: {
						name: 'Twitch',
						value:
							link.title === 'Twitch' && username
								? username
								: timelineList[0]?.account?.fields?.find(
										v => v.name === 'Twitch',
								  )?.value || '',
					},
					8: {
						name: 'Patreon',
						value:
							link.title === 'Patreon' && username
								? username
								: timelineList[0]?.account?.fields?.find(
										v => v.name === 'Patreon',
								  )?.value || '',
					},
				},
			};
			mutateAsync(updatedProfile);
		}
	};
	const { mutateAsync, isPending } = useProfileMutation({
		onSuccess: async response => {
			queryClient.invalidateQueries({
				queryKey: [
					'account-detail-feed',
					{
						domain_name: process.env.API_URL ?? DEFAULT_API_URL,
						account_id: userInfo?.id,
					},
				],
			});
			setUserInfo(response);
		},
		onError: error => {
			handleError(error);
		},
	});

	return (
		<ScrollProvider>
			{isPending ? (
				<View
					style={{
						backgroundColor: customColor['patchwork-dark-100'],
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Flow size={50} color={customColor['patchwork-red-50']} />
				</View>
			) : (
				<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
					{timeline ? (
						<>
							<FeedTitleHeader title={timelineList[0]?.account?.display_name} />
							<Tabs.Container
								renderHeader={() => {
									return (
										<CollapsibleFeedHeader
											type="Profile"
											is_my_account={true}
											profile={timelineList[0]?.account}
											onPressPlusIcon={() =>
												setSocialLinkAction({ visible: true, formType: 'add' })
											}
											onPressEditIcon={() =>
												setSocialLinkAction({ visible: true, formType: 'edit' })
											}
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
										renderItem={({ item }) => {
											return item.reblog ? (
												<></>
											) : (
												<StatusItem
													handleOnPress={() => {
														handleOnPressStatus(item.id);
													}}
													status={item}
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
							<SocialLink
								openThemeModal={socialLinkAction.visible}
								onClose={() =>
									setSocialLinkAction({ visible: false, formType: 'add' })
								}
								onPressAdd={(link, username) =>
									handleAddSocialLink(link, username)
								}
								formType={socialLinkAction.formType}
								data={timelineList[0]?.account?.fields?.filter(v => v.value)}
							/>
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
			)}
		</ScrollProvider>
	);
};

export default Profile;
