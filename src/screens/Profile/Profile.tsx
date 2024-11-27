import React, { useMemo, useState } from 'react';
import {
	View,
	TouchableOpacity,
	Platform,
	Dimensions,
	RefreshControl,
} from 'react-native';
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
import { generateFieldsAttributes } from '@/util/helper/generateFieldAttributes';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';
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
	const [showDelConf, setShowDelConf] = useState<{
		visible: boolean;
		title: string;
	}>({ visible: false, title: '' });
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
		refetch: refetchProfileFeed,
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

	const handleSocialLinkChange = async (
		link: string,
		username: string,
		type: 'edit' | 'delete',
	) => {
		setSocialLinkAction({ visible: false, formType: 'add' });
		if (userInfo) {
			const updatedProfile: UpdateProfilePayload = {
				fields_attributes: generateFieldsAttributes(
					userInfo,
					link,
					username,
					type,
				),
			};
			await mutateAsync(updatedProfile);
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

	const handleRefresh = () => {
		refetchProfileFeed();
	};

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
					{timeline && userInfo ? (
						<>
							<FeedTitleHeader title={timelineList[0]?.account?.display_name} />
							<Tabs.Container
								renderHeader={() => {
									return (
										<CollapsibleFeedHeader
											type="Profile"
											is_my_account={true}
											// profile={timelineList[0]?.account}
											profile={userInfo}
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
										refreshControl={
											<RefreshControl
												className="mt-1"
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
									handleSocialLinkChange(link, username, 'edit')
								}
								onPressDelete={link =>
									setShowDelConf({ visible: true, title: link })
								}
								formType={socialLinkAction.formType}
								data={userInfo?.fields?.filter(v => v.value)}
							/>
							{showDelConf.visible && (
								<CustomAlert
									message={`Are u sure you want to delete the ${showDelConf.title} link?`}
									title="Delete Confirmation"
									hasCancel
									handleCancel={() =>
										setShowDelConf({ visible: false, title: '' })
									}
									handleOk={() => {
										setShowDelConf({ visible: false, title: '' });
										handleSocialLinkChange(showDelConf.title, '', 'delete');
									}}
								/>
							)}
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
