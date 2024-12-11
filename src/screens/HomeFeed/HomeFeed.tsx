import HomeFeedHeader from '@/components/molecules/feed/HomeFeedHeader/HomeFeedHeader';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { mockUserList } from '@/mock/feed/statusList';
import { HomeStackScreenProps } from '@/types/navigation';
import { useColorScheme } from 'nativewind';
import {
	Platform,
	Pressable,
	RefreshControl,
	ScrollView,
	View,
} from 'react-native';
import ChannelLoading from '@/components/atoms/loading/ChannelLoading';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import {
	useGetMyChannels,
	useRecommendedChannels,
} from '@/hooks/queries/channel.queries';
import ChannelCard from '@/components/atoms/channel/ChannelCard/ChannelCard';
import { useAuthStore } from '@/store/auth/authStore';
import { FlatList } from 'react-native-gesture-handler';
import customColor from '@/util/constant/color';
import { ensureHttp } from '@/util/helper/helper';
import { useEffect, useState } from 'react';
import { delay } from 'lodash';
import { usePushNotiTokenMutation } from '@/hooks/mutations/pushNoti.mutation';
import { usePushNoticationStore } from '@/store/pushNoti/pushNotiStore';

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
	const [isRefreshing, setIsRefreshing] = useState(false);

	const handleRefresh = () => {
		setIsRefreshing(true);
		refetchChannels();
		delay(() => setIsRefreshing(false), 1500);
	};

	// ***** Push Notification Token Mutation ***** //
	const fcmToken = usePushNoticationStore(state => state.fcmToken);

	const { mutate } = usePushNotiTokenMutation({
		onSuccess: () => {
			/**
			 * Generated Token means everytime you enter the app, it will not be invalid.
			 * When the users try to uninstall/clear-data or something else, the token will be generated again.
			 */
			console.log(
				'Push Notification Token',
				'Generated & Saved into database.',
			);
		},
	});

	useEffect(() => {
		if (fcmToken) {
			mutate({
				notification_token: fcmToken,
				platform_type: Platform.OS,
			});
		}
	}, [fcmToken]);
	// ***** Push Notification Token Mutation ***** //

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
								<ThemeText
									className="font-SourceSans3_Bold my-2 flex-1"
									size="lg_18"
								>
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
													domain_name: ensureHttp(item.attributes.domain_name),
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
								<ThemeText
									className="font-SourceSans3_Bold my-2 flex-1"
									size="lg_18"
								>
									Explore Channels
								</ThemeText>
								<Pressable onPress={() => navigation.navigate('SearchFeed')}>
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
									domain_name: ensureHttp(item.attributes.domain_name),
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
							refreshing={isRefreshing}
							tintColor={customColor['patchwork-light-900']}
							onRefresh={handleRefresh}
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
