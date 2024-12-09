import React, { useCallback, useState } from 'react';
import {
	View,
	TouchableOpacity,
	Platform,
	Dimensions,
	RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

import { useAuthStore } from '@/store/auth/authStore';
import { DEFAULT_API_URL } from '@/util/constant';
import { CircleFade, Flow } from 'react-native-animated-spinkit';
import SocialLink from '@/components/organisms/profile/SocialLink/SocialLink';
import { useProfileMutation } from '@/hooks/mutations/profile.mutation';
import { queryClient } from '@/App';
import {
	AccountInfoQueryKey,
	UpdateProfilePayload,
} from '@/types/queries/profile.type';
import { handleError } from '@/util/helper/helper';
import StatusWrapper from '@/components/organisms/feed/StatusWrapper/StatusWrapper';
import { generateFieldsAttributes } from '@/util/helper/generateFieldAttributes';
import { verifyAuthToken } from '@/services/auth.service';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useActiveFeedAction } from '@/store/feed/activeFeed';
import { useAccountInfo } from '@/hooks/queries/profile.queries';
import { useManageAttachmentActions } from '@/store/compose/manageAttachments/manageAttachmentStore';
import { cleanText } from '@/util/helper/cleanText';
import { delay } from 'lodash';
const Profile: React.FC<HomeStackScreenProps<'Profile'>> = ({
	route,
	navigation,
}) => {
	const { colorScheme } = useColorScheme();
	const { bottom, top } = useSafeAreaInsets();
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

	const { clearFeed } = useActiveFeedAction();
	const { resetAttachmentStore } = useManageAttachmentActions();

	// ***** Get Account Info ***** //
	const acctInfoQueryKey: AccountInfoQueryKey = [
		'get_account_info',
		{ id: userInfo?.id!, domain_name },
	];

	const { data: accountInfoData, refetch: refetchAccountInfo } =
		useAccountInfo(acctInfoQueryKey);
	// ***** Get Account Info ***** //

	const {
		data: timeline,
		hasNextPage,
		fetchNextPage,
		isFetching,
		refetch: refetchProfileFeed,
	} = useAccountDetailFeed({
		domain_name: process.env.API_URL ?? DEFAULT_API_URL,
		account_id: userInfo?.id!,
		exclude_replies: true,
		exclude_reblogs: false,
		exclude_original_statuses: false,
	});

	const {
		data: replies,
		hasNextPage: hasNextReplies,
		fetchNextPage: fetchReplies,
		isFetching: isFetchingReplies,
		refetch: refetchReplies,
	} = useAccountDetailFeed({
		domain_name: process.env.API_URL ?? DEFAULT_API_URL,
		account_id: userInfo?.id!,
		exclude_replies: false,
		exclude_reblogs: true,
		exclude_original_statuses: true,
	});

	const [isRefresh, setIsRefresh] = useState(false);

	const onTimelineContentLoadMore = () => {
		if (hasNextPage) {
			return fetchNextPage();
		}
	};

	const onReplyFeedLoadMore = () => {
		if (hasNextReplies) {
			return fetchReplies();
		}
	};

	const handleSocialLinkChange = async (
		link: string,
		username: string,
		type: 'edit' | 'delete',
	) => {
		if (userInfo) {
			const updatedProfile: UpdateProfilePayload = {
				display_name: userInfo?.display_name,
				note: cleanText(userInfo?.note),
				fields_attributes: generateFieldsAttributes(
					userInfo,
					link,
					username,
					type,
				),
			};
			await mutateAsync(updatedProfile);
			setSocialLinkAction({ visible: false, formType: 'add' });
		}
	};

	const { mutateAsync, isPending } = useProfileMutation({
		onSuccess: async response => {
			refetchAccountInfo();
			queryClient.invalidateQueries({
				queryKey: [
					'account-detail-feed',
					{
						domain_name: process.env.API_URL ?? DEFAULT_API_URL,
						account_id: userInfo?.id,
						exclude_reblogs: false,
						exclude_replies: true,
						exclude_original_statuses: false,
					},
				],
			});
			setUserInfo(response);
		},
		onError: error => {
			handleError(error);
		},
	});

	const handleRefresh = async () => {
		setIsRefresh(true);
		refetchProfileFeed();
		refetchAccountInfo();
		const res = await verifyAuthToken();
		setUserInfo(res);
		setIsRefresh(false);
	};

	useFocusEffect(
		useCallback(() => {
			resetAttachmentStore();
		}, []),
	);

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
					{timeline && accountInfoData ? (
						<>
							<FeedTitleHeader title={accountInfoData.display_name} />
							<Tabs.Container
								renderHeader={() => {
									return (
										<CollapsibleFeedHeader
											type="Profile"
											is_my_account={true}
											// myAcctId={accountInfoData.id}
											profile={accountInfoData}
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
												<StatusWrapper status={item} />
											);
										}}
										refreshControl={
											<RefreshControl
												className="mt-1"
												refreshing={isRefresh}
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
									<Tabs.FlashList
										data={flattenPages(replies)}
										contentContainerStyle={{
											paddingBottom: bottom,
											backgroundColor:
												colorScheme === 'dark' ? '#2E363B' : '#ffffff',
										}}
										keyExtractor={item => item.id.toString()}
										renderItem={({ item }) => {
											return <StatusWrapper status={item} />;
										}}
										refreshControl={
											<RefreshControl
												className="mt-1"
												refreshing={isRefresh}
												tintColor={customColor['patchwork-light-900']}
												onRefresh={() => {
													delay(() => setIsRefresh(true), 1500);
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
							<SocialLink
								openThemeModal={socialLinkAction.visible}
								onClose={() =>
									setSocialLinkAction({ visible: false, formType: 'add' })
								}
								onPressAdd={(link, username) =>
									handleSocialLinkChange(link, username, 'edit')
								}
								onPressDelete={link =>
									Alert.alert(
										'Confirmation',
										`Are u sure you want to delete the ${link} link?`,
										[
											{
												text: 'Cancel',
												onPress: () => {},
												style: 'cancel',
											},
											{
												text: 'OK',
												onPress: () => {
													handleSocialLinkChange(link, ' ', 'delete');
												},
											},
										],
										{ cancelable: false },
									)
								}
								formType={socialLinkAction.formType}
								data={accountInfoData.fields?.filter(v => v.value)}
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
