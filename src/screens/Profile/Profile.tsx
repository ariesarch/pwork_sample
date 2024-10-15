import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
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

const Profile: React.FC<HomeStackScreenProps<'Profile'>> = ({ route }) => {
	const { colorScheme } = useColorScheme();
	const { bottom } = useSafeAreaInsets();
	const [activeTab, setActiveTab] = useState(0);
	const { id } = route.params;
	const domain_name = useSelectedDomain();
	const navigation = useNavigation();

	const {
		data: timeline,
		hasNextPage,
		fetchNextPage,
		isFetching,
	} = useAccountDetailFeed({
		domain_name,
		account_id: id,
	});

	const timelineList = timeline ? flattenPages(timeline) : [];

	const onTimelineContentLoadMore = () => {
		if (hasNextPage && activeTab === 0) {
			return fetchNextPage();
		}
	};

	return (
		<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
			{timeline ? (
				<SectionListWithHeaders
					HeaderComponent={({ scrollY, showNavBar }) => (
						<CommonHeader
							scrollY={scrollY}
							showNavBar={showNavBar}
							bannerSrc={timeline}
							blurhash={timelineList[0].account.avatar} //tmp
							imageSrc={
								timelineList[0].account.avatar ||
								require('../../../assets/images/mock/channel/channel_banner.png')
							}
							avatarStyle="rounded-md -top-4 w-20 h-20 border-patchwork-dark-100 border-[2.56px]"
							channelName={timelineList[0].account.display_name} //tmp
						/>
					)}
					LargeHeaderComponent={() => (
						<ProfileInfo accountName={timelineList[0].account.display_name} />
					)}
					sections={[{ data: activeTab === 0 ? flattenPages(timeline) : [] }]}
					disableAutoFixScroll
					ignoreLeftSafeArea
					ignoreRightSafeArea
					headerFadeInThreshold={0.2}
					disableLargeHeaderFadeAnim
					contentContainerStyle={{
						flexGrow: 1,
						paddingBottom: bottom,
						backgroundColor: colorScheme === 'dark' ? '#2E363B' : '#ffffff',
					}}
					renderItem={({ item }) =>
						activeTab === 0 ? <StatusItem status={item} /> : <></>
					}
					stickySectionHeadersEnabled
					showsVerticalScrollIndicator={false}
					renderSectionHeader={() => (
						<View
							className={
								'flex-row bg-patchwork-light-900 dark:bg-patchwork-dark-100'
							}
						>
							{['Posts', 'Replies'].map((tab, index) => (
								<TouchableOpacity
									key={`option-${index}`}
									className="flex-1 items-center justify-center"
									onPress={() => setActiveTab(index)}
								>
									<ThemeText
										size={'md_16'}
										variant={activeTab === index ? 'default' : 'textGrey'}
										className="py-2 font-semibold"
									>
										{tab}
									</ThemeText>
									{activeTab === index && (
										<View
											className={
												'h-[2] w-4/5 bg-patchwork-dark-100 dark:bg-patchwork-light-900'
											}
										/>
									)}
								</TouchableOpacity>
							))}
						</View>
					)}
					onEndReachedThreshold={0.15}
					onEndReached={onTimelineContentLoadMore}
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
				<SafeScreen>
					<View style={{ flex: 1 }}>
						<TouchableOpacity
							onPress={() => navigation.canGoBack() && navigation.goBack()}
							className="w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-50 ml-4 mb-3"
						>
							<ProfileBackIcon />
						</TouchableOpacity>
						<View style={{ flex: 1, marginTop: 20 }}>
							<ChannelProfileLoading />
						</View>
					</View>
				</SafeScreen>
			)}
		</View>
	);
};

export default Profile;
