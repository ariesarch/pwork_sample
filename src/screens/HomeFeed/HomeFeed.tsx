import Card from '@/components/atoms/card/Card';
import Chip from '@/components/atoms/common/Chip/Chip';
import AccountAvatar from '@/components/molecules/feed/AccountAvatar/AccountAvatar';
import HomeFeedHeader from '@/components/molecules/feed/HomeFeedHeader/HomeFeedHeader';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { mockHashTag } from '@/mock/feed/myChanel';
import { mockUserList } from '@/mock/feed/statusList';
import { HomeStackScreenProps } from '@/types/navigation';
import { ChevronRight, ListItem } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { Pressable, ScrollView, View } from 'react-native';
import ChannelLoading from '@/components/atoms/loading/ChannelLoading';
import PeopleFollowingLoading from '@/components/atoms/loading/PeopleFollowingLoading';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import {
	useGetMyChannels,
	useRecommendedChannels,
} from '@/hooks/queries/channel.queries';
import ChannelCard from '@/components/atoms/channel/ChannelCard/ChannelCard';
import { useAuthStore } from '@/store/auth/authStore';

const HomeFeed = ({ navigation }: HomeStackScreenProps<'HomeFeed'>) => {
	const { colorScheme } = useColorScheme();
	const { setDomain } = useActiveDomainAction();
	const { data: recommendedChannels } = useRecommendedChannels();

	const { data: myChannels } = useGetMyChannels();
	const { userInfo } = useAuthStore();
	console.log('userInfo::', userInfo);

	return (
		<SafeScreen>
			<HomeFeedHeader
				account={userInfo ?? mockUserList[0]}
				showUnderLine={false}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="mx-6 my-2">
					{myChannels ? (
						<>
							<View className="flex-row items-center">
								<ThemeText className="font-bold my-2 flex-1" size="lg_18">
									My Channels
								</ThemeText>
							</View>
							{myChannels.map((item, idx) => (
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
						</>
					) : (
						<ChannelLoading title="My Channels" />
					)}
				</View>
				<View className="mx-6 my-2">
					{recommendedChannels ? (
						<>
							<View className="flex-row items-center">
								<ThemeText className="font-bold my-2 flex-1" size="lg_18">
									Explore Channels
								</ThemeText>
								<Pressable onPress={() => {}}>
									<ThemeText variant="textGrey">View All</ThemeText>
								</Pressable>
							</View>
							{recommendedChannels.map((item, idx) => (
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
						</>
					) : (
						<ChannelLoading title="Explore Channels" cardCount={3} />
					)}
				</View>
			</ScrollView>
		</SafeScreen>
	);
};

export default HomeFeed;
