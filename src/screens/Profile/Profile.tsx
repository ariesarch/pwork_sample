import React, { useEffect, useMemo, useState } from 'react';
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
import useHandleOnPressStatus from '@/hooks/custom/useHandleOnPressStatus';
import {
	useGetProfileDetail,
	useGetProfileDetailStatus,
} from '@/hooks/queries/profile.queries';
import AddNewLink, {
	SocialMediaLink,
} from '@/components/organisms/profile/AddNewLink/AddNewLink';
import {
	ProfileDetailQueryKey,
	UpdateProfileCredentialsQueryKey,
	UpdateProfileCredentialsQueryParam,
} from '@/types/queries/profile.type';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { updateProfileCredendials } from '@/services/profile.service';
import { useAuthStore } from '@/store/auth/authStore';
import { DEFAULT_API_URL } from '@/util/constant';
const Profile: React.FC<HomeStackScreenProps<'Profile'>> = ({
	route,
	navigation,
}) => {
	const { colorScheme } = useColorScheme();
	const { bottom, top } = useSafeAreaInsets();
	const [activeTab, setActiveTab] = useState(0);
	const [isNewLinkModalVisible, setIsNewLinkModalVisible] =
		useState<boolean>(false);
	const domain_name = useSelectedDomain();
	const { userInfo } = useAuthStore();
	const barColor = useAppropiateColorHash('patchwork-dark-100');
	const tabBarTextColor = useAppropiateColorHash(
		'patchwork-light-900',
		'patchwork-dark-100',
	);
	const queryClient = new QueryClient();

	const queryKey: ProfileDetailQueryKey = [
		'get_profile_detail_info_by_account',
		{ id: userInfo?.id! },
	];

	const { data: profileDetail, isLoading: isLoadingProfileDetail } =
		useGetProfileDetail(queryKey);

	const existingData = queryClient.getQueryData(queryKey);
	console.log(existingData);

	const updateProfileMutation = useMutation({
		mutationFn: (updatedData: UpdateProfileCredentialsQueryParam) => {
			return updateProfileCredendials(updatedData);
		},
		onSuccess: (_, variables) => {
			console.log('Variables:', variables);

			const existingData = queryClient.getQueryData(queryKey);
			console.log('cached data by get query data: ', existingData);
			// if (!existingData) {
			// 	console.warn('No existing data in the cache to update:', queryKey);
			// 	return;
			// }
			// queryClient.setQueryData(
			// 	queryKey,
			// 	(oldData: Pathchwork.ProfileDetail | undefined) => {
			// 		if (!oldData) return undefined;

			// 		const updatedAccount: Pathchwork.Account = {
			// 			...oldData.account_data.account,
			// 			fields: variables.fields,
			// 		};

			// 		return {
			// 			...oldData,
			// 			account_data: {
			// 				...oldData.account_data,
			// 				account: updatedAccount,
			// 			},
			// 		};
			// 	},
			// );

			console.log('Profile detail cache updated successfully.');

			// const cachedData = queryClient.getQueryData(queryKey);
			// console.log('Cached data after update:', cachedData);
		},
	});

	const handleAddSocialLink = async (
		link: SocialMediaLink,
		username: string,
	) => {
		setIsNewLinkModalVisible(false);
		if (profileDetail) {
			const updatedProfile: UpdateProfileCredentialsQueryParam = {
				display_name: profileDetail.display_name,
				note: profileDetail.note.replace(/<[^>]*>/g, ''),
				avatar: '',
				header: '',
				bot: profileDetail.bot,
				discoverable: profileDetail.discoverable,
				hide_collections: profileDetail.hide_collections,
				country: profileDetail.country,
				fields: [
					{
						name: 'Website',
						value:
							link.title === 'Website' && username
								? `https://${username}`
								: profileDetail.fields?.find(v => v.name === 'Website')
										?.value || '',
					},
					{
						name: 'Twitter',
						value:
							link.title === 'Twitter' && username
								? `https://twitter.com/${username}`
								: profileDetail.fields?.find(v => v.name === 'Twitter')
										?.value || '',
					},
					{
						name: 'TikTok',
						value:
							link.title === 'TikTok' && username
								? `https://www.tiktok.com/@${username}`
								: profileDetail.fields?.find(v => v.name === 'TikTok')?.value ||
								  '',
					},
					{
						name: 'Youtube',
						value:
							link.title === 'Youtube' && username
								? `https://www.youtube.com/@${username}`
								: profileDetail.fields?.find(v => v.name === 'Youtube')
										?.value || '',
					},
					{
						name: 'Linkedin',
						value:
							link.title === 'Linkedin' && username
								? `https://www.linkedin.com/in/${username}`
								: profileDetail.fields?.find(v => v.name === 'Linkedin')
										?.value || '',
					},
					{
						name: 'Instagram',
						value:
							link.title === 'Instagram' && username
								? `https://www.instagram.com/${username}`
								: profileDetail.fields?.find(v => v.name === 'Instagram')
										?.value || '',
					},
					{
						name: 'Substack',
						value:
							link.title === 'Substack' && username
								? `https://${username}.substack.com`
								: profileDetail.fields?.find(v => v.name === 'Substack')
										?.value || '',
					},
					{
						name: 'Facebook',
						value:
							link.title === 'Facebook' && username
								? `https://www.facebook.com/${username}`
								: profileDetail.fields?.find(v => v.name === 'Facebook')
										?.value || '',
					},
					{
						name: 'Email',
						value:
							link.title === 'Email' && username
								? `mailto:${username}`
								: profileDetail.fields?.find(v => v.name === 'Email')?.value ||
								  '',
					},
				],
			};
			updateProfileMutation.mutate(updatedProfile);
		}
	};

	const queryParams = {
		domain_name,
		account_id: userInfo?.id,
	};
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
	// const handleOnPressStatus = useHandleOnPressStatus(feed, navigation, [
	// 	'account-detail-feed',
	// 	queryParams,
	// ]);

	// const onTimelineContentLoadMore = () => {
	// 	if (hasNextPage && activeTab === 0) {
	// 		return fetchNextPage();
	// 	}
	// };
	if (updateProfileMutation.isPending) {
		return <ThemeText>Loading...</ThemeText>;
	}

	return (
		<ScrollProvider>
			<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
				{profileDetail && timeline ? (
					<>
						<FeedTitleHeader title={'Severus'} />
						{updateProfileMutation.isSuccess && (
							<ThemeText>mutation success</ThemeText>
						)}
						<Tabs.Container
							renderHeader={() => {
								return (
									<CollapsibleFeedHeader
										type="Profile"
										profile={timelineList[0]?.account}
										onPressPlusIcon={() => setIsNewLinkModalVisible(true)}
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
													// handleOnPressStatus(item.id);
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
									// onEndReached={onTimelineContentLoadMore}
									showsVerticalScrollIndicator={false}
									// ListFooterComponent={
									// 	isFetching ? (
									// 		<View className="my-3 items-center">
									// 			<CircleFade size={25} color="white" />
									// 		</View>
									// 	) : (
									// 		<></>
									// 	)
									// }
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
						<AddNewLink
							openThemeModal={isNewLinkModalVisible}
							onClose={() => setIsNewLinkModalVisible(false)}
							onPressAdd={(link, username) =>
								handleAddSocialLink(link, username)
							}
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
		</ScrollProvider>
	);
};

export default Profile;
