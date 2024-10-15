/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { SectionListWithHeaders } from '@codeherence/react-native-header';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import Underline from '@/components/atoms/common/Underline/Underline';
import CommonHeader from '@/components/molecules/common/CommonHeader/CommonHeader';
import HorizontalScrollMenu from '@/components/organisms/channel/HorizontalScrollMenu/HorizontalScrollMenu';
import ChannelAbout from '@/components/organisms/channel/ChannelAbout/ChannelAbout';
import ChannelProfileHeaderInfo from '@/components/organisms/channel/ChannelProfileHeaderInfo/ChannelProfileHeaderInfo';
import { HomeStackScreenProps } from '@/types/navigation';
import ChannelProfileLoading from '@/components/atoms/loading/ChannelProfileLoading';
import {
	useGetChannelAbout,
	useGetChannelFeed,
} from '@/hooks/queries/channel.queries';
import { flattenPages } from '@/util/helper/timeline';
import { useNavigation } from '@react-navigation/native';
import { ProfileBackIcon } from '@/util/svg/icon.profile';
import { CircleFade } from 'react-native-animated-spinkit';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';

const ChannelProfile: React.FC<HomeStackScreenProps<'ChannelProfile'>> = ({
	route,
}) => {
	const navigation = useNavigation();
	const { colorScheme } = useColorScheme();
	const { bottom } = useSafeAreaInsets();
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

	const [activeTab, setActiveTab] = useState(0);

	const onTimelineContentLoadMore = () => {
		if (hasNextPage && activeTab === 0) {
			return fetchNextPage();
		}
	};

	const barColor = useAppropiateColorHash('patchwork-dark-100');

	useEffect(() => {
		StatusBar.setTranslucent(true);
		StatusBar.setBackgroundColor('transparent');
		return () => {
			StatusBar.setTranslucent(false);
			StatusBar.setBackgroundColor(barColor);
		};
	}, []);

	return (
		<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
			{timeline && channelAbout ? (
				<SectionListWithHeaders
					HeaderComponent={({ scrollY, showNavBar }) => (
						<CommonHeader
							scrollY={scrollY}
							showNavBar={showNavBar}
							bannerSrc={channelAbout?.thumbnail?.url}
							blurhash={channelAbout?.thumbnail?.blurhash}
							imageSrc={
								channelAbout?.thumbnail.url ||
								require('../../../assets/images/mock/channel/channel_banner.png')
							}
							avatarStyle="rounded-md -top-4 w-20 h-20 border-patchwork-dark-100 border-[2.56px]"
							channelName="channelName"
						/>
					)}
					LargeHeaderComponent={() => (
						<ChannelProfileHeaderInfo channelAbout={channelAbout!} />
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
					onEndReachedThreshold={0.15}
					onEndReached={onTimelineContentLoadMore}
					renderSectionHeader={() => (
						<View className="bg-patchwork-light-900 dark:bg-patchwork-dark-100">
							<View className="flex-1 flex-row bg-patchwork-light-900 dark:bg-patchwork-dark-100">
								{['Posts', 'About'].map((tab, index) => (
									<View className="flex-1" key={index}>
										<TouchableOpacity
											key={`option-${index}`}
											className="flex-1 items-center justify-center h-[34]"
											onPress={() => setActiveTab(index)}
										>
											<ThemeText
												size="md_16"
												variant={activeTab === index ? 'default' : 'textGrey'}
												className="font-semibold"
											>
												{tab}
											</ThemeText>
											{activeTab === index && (
												<View className="absolute top-5 h-[2] w-4/5 mt-3 rounded-lg bg-patchwork-dark-100 dark:bg-patchwork-light-900" />
											)}
										</TouchableOpacity>
									</View>
								))}
							</View>
							{activeTab === 1 && <Underline className="mt-1" />}
							{activeTab === 0 ? (
								<HorizontalScrollMenu />
							) : (
								<ChannelAbout channelAbout={channelAbout} />
							)}
						</View>
					)}
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
			)}
		</View>
	);
};

export default ChannelProfile;
