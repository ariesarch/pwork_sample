import Card from '@/components/atoms/card/Card';
import Chip from '@/components/atoms/common/Chip/Chip';
import HomeFeedHeader from '@/components/molecules/feed/HomeFeedHeader/HomeFeedHeader';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { mockHashTag } from '@/mock/feed/myChanel';
import { mockUserList } from '@/mock/feed/statusList';
import { HomeStackScreenProps } from '@/types/navigation';
import { ChevronRight, ListItem } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { Pressable, RefreshControl, ScrollView, View } from 'react-native';
import ChannelLoading from '@/components/atoms/loading/ChannelLoading';
import PeopleFollowingLoading from '@/components/atoms/loading/PeopleFollowingLoading';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import {
	useGetMyChannels,
	useRecommendedChannels,
} from '@/hooks/queries/channel.queries';
import ChannelCard from '@/components/atoms/channel/ChannelCard/ChannelCard';
import { useAuthStore } from '@/store/auth/authStore';
import { FlashList } from '@shopify/flash-list';
import { FlatList } from 'react-native-gesture-handler';
import customColor from '@/util/constant/color';

const HomeFeed = ({ navigation }: HomeStackScreenProps<'HomeFeed'>) => {
	const { colorScheme } = useColorScheme();
	const { setDomain } = useActiveDomainAction();
	const {
		data: recommendedChannels,
		isFetching,
		refetch: refetchChannels,
	} = useRecommendedChannels();

	const { data: myChannels } = useGetMyChannels();
	const { userInfo } = useAuthStore();

	return (
		<SafeScreen>
			<HomeFeedHeader
				account={userInfo ?? mockUserList[0]}
				showUnderLine={false}
			/>
			{recommendedChannels && myChannels ? (
				<FlatList
					data={recommendedChannels}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={() => (
						<>
							<View className="flex-row items-center">
								<ThemeText className="font-bold my-2 flex-1" size="lg_18">
									My Channels
								</ThemeText>
							</View>
							{myChannels &&
								myChannels.map((item, idx) => (
									<View key={idx}>
										<ChannelCard
											channel={item.attributes}
											handlePress={() => {
												setDomain(item.attributes.domain_name);
												navigation.navigate('ChannelProfile', {
													domain_name: item.attributes.domain_name,
													channel_info: {
														avatar_image_url: item.attributes.avatar_image_url,
														banner_image_url: item.attributes.banner_image_url,
														channel_name: item.attributes.name,
													},
												});
											}}
										/>
									</View>
								))}
							<View className="flex-row items-center">
								<ThemeText className="font-bold my-2 flex-1" size="lg_18">
									Explore Channels
								</ThemeText>
								<Pressable onPress={() => {}}>
									<ThemeText variant="textGrey">View All</ThemeText>
								</Pressable>
							</View>
						</>
					)}
					renderItem={({ item }) => (
						<ChannelCard
							channel={item.attributes}
							handlePress={() => {
								setDomain(item.attributes.domain_name);
								navigation.navigate('ChannelProfile', {
									domain_name: item.attributes.domain_name,
									channel_info: {
										avatar_image_url: item.attributes.avatar_image_url,
										banner_image_url: item.attributes.banner_image_url,
										channel_name: item.attributes.name,
									},
								});
							}}
						/>
					)}
					refreshControl={
						<RefreshControl
							refreshing={isFetching}
							tintColor={customColor['patchwork-light-900']}
							onRefresh={refetchChannels}
						/>
					}
					className="mx-6 my-2"
					keyExtractor={item => item.id.toString()}
					showsHorizontalScrollIndicator={false}
				/>
			) : (
				<ScrollView className="mx-6 my-2" showsVerticalScrollIndicator={false}>
					<ChannelLoading title="My Channels" />
					<ChannelLoading title="Explore Channels" cardCount={3} />
				</ScrollView>
			)}
		</SafeScreen>
	);
};

export default HomeFeed;
