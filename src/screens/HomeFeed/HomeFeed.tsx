import Card from '@/components/atoms/card/Card';
import Chip from '@/components/atoms/common/Chip/Chip';
import AccountAvatar from '@/components/molecules/feed/AccountAvatar/AccountAvatar';
import HomeFeedHeader from '@/components/molecules/feed/HomeFeedHeader/HomeFeedHeader';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import {
	mockHashTag,
	mockLocalChannelList,
	mockServerChannellList,
} from '@/mock/feed/myChanel';
import { mockUserList } from '@/mock/feed/statusList';
import { HomeStackScreenProps } from '@/types/navigation';
import { ChevronRight, ListItem } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { Pressable, ScrollView, View } from 'react-native';
import { useGetMyChannels } from '@/hooks/queries/channel.queries';
import ChannelLoading from '@/components/atoms/loading/ChannelLoading';
import PeopleFollowingLoading from '@/components/atoms/loading/PeopleFollowingLoading';

const HomeFeed = ({ navigation }: HomeStackScreenProps<'HomeFeed'>) => {
	const { colorScheme } = useColorScheme();
	const { data: channelList } = useGetMyChannels();

	return (
		<SafeScreen>
			<HomeFeedHeader account={mockUserList[0]} showUnderLine={false} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="ml-6 my-2">
					{channelList ? (
						<>
							<View className="flex-row items-center">
								<ThemeText className="font-bold my-2 flex-1" size="lg_18">
									My Channels
								</ThemeText>
								<Pressable onPress={() => {}} className="mr-4">
									<ThemeText variant="textGrey">View All</ThemeText>
								</Pressable>
							</View>
							<ScrollView horizontal showsHorizontalScrollIndicator={false}>
								{channelList.map((item, idx) => (
									<View key={idx}>
										<Card
											imageSource={item.image_url}
											title={item.name}
											onPress={() =>
												navigation.navigate('ChannelProfile', {
													slug: item.slug,
												})
											}
										/>
									</View>
								))}
							</ScrollView>
						</>
					) : (
						<ChannelLoading />
					)}
				</View>
				<View className="ml-6 my-2">
					{channelList ? (
						<>
							<View className="flex flex-row items-center">
								<ThemeText className="font-bold my-2 flex-1" size="lg_18">
									Server Channels
								</ThemeText>
								<Pressable onPress={() => {}} className="mr-4">
									<ThemeText variant="textGrey">View All</ThemeText>
								</Pressable>
							</View>
							<ScrollView horizontal showsHorizontalScrollIndicator={false}>
								{channelList.map((item, idx) => (
									<View key={idx}>
										<Card
											imageSource={item.image_url}
											title={item.name}
											onPress={() =>
												navigation.navigate('ChannelProfile', {
													slug: 'https://science.channel.org',
												})
											}
										/>
									</View>
								))}
							</ScrollView>
						</>
					) : (
						<ChannelLoading />
					)}
				</View>
				<View className="ml-6 my-2">
					{mockUserList ? (
						<>
							<View className="flex flex-row items-center">
								<ThemeText className="font-bold my-2 flex-1" size="lg_18">
									People Following
								</ThemeText>
								<Pressable
									// onPress={() => navigation.navigate('PeopleFollowing')}
									className="mr-4"
								>
									<ThemeText variant="textGrey">View All</ThemeText>
								</Pressable>
							</View>
							<ScrollView horizontal showsHorizontalScrollIndicator={false}>
								{mockUserList.map((item, idx) => (
									<View key={idx}>
										<AccountAvatar
											account={item}
											size={20}
											dotAlert={item.hasNoti}
											className="mr-3"
										/>
									</View>
								))}
							</ScrollView>
						</>
					) : (
						<PeopleFollowingLoading />
					)}
				</View>
				<View className="ml-6 my-2">
					{channelList ? (
						<>
							<ThemeText className="font-bold my-2" size="lg_18">
								Local Channels
							</ThemeText>
							<ScrollView horizontal showsHorizontalScrollIndicator={false}>
								{channelList.map((item, idx) => (
									<View key={idx}>
										<Card
											imageSource={item.image_url}
											title={item.name}
											onPress={() =>
												navigation.navigate('ChannelProfile', {
													slug: 'https://science.channel.org',
												})
											}
										/>
									</View>
								))}
							</ScrollView>
						</>
					) : (
						<ChannelLoading isLocalChannel />
					)}
				</View>
				<View className="ml-6 my-2">
					<ThemeText className="font-bold my-2" size="lg_18">
						HashTag Following
					</ThemeText>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{mockHashTag.map((item, idx) => (
							<View key={idx} className="my-1">
								<Chip
									variant="outline"
									title={item.name}
									className="mx-1"
									dotAlert={item.hasNoti}
								/>
							</View>
						))}
					</ScrollView>
				</View>
				<View className="ml-6 my-2">
					<ThemeText className="font-bold mt-2" size="lg_18">
						My Lists
					</ThemeText>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						className="mt-2"
					>
						{mockHashTag.map((item, idx) => (
							<View key={idx} className="my-1">
								<Chip
									variant="outline"
									startIcon={<ListItem colorScheme={colorScheme} />}
									endIcon={<ChevronRight colorScheme={colorScheme} />}
									title="List Name"
									className="mx-1"
									dotAlert={item.hasNoti}
								/>
							</View>
						))}
					</ScrollView>
				</View>
			</ScrollView>
		</SafeScreen>
	);
};

export default HomeFeed;
