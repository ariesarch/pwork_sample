import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import React, { useState } from 'react';
import {
	FlatList,
	Pressable,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { SearchIcon } from '@/util/svg/icon.common';
import {
	HomeStackScreenProps,
	SearchStackScreenProps,
} from '@/types/navigation';
import { SceneMap, TabView } from 'react-native-tab-view';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import NotiTabBarItemLabel from '@/components/atoms/notifications/NotiTabBarItemLabel/NotiTabBarItemLabel';
import NotiAll from '@/components/organisms/notifications/NotiAll/NotiAll';
import { useColorScheme } from 'nativewind';
import SearchResultsTabBarItemLabel from '@/components/atoms/search/SearchResultsTabBarItemLabel/SearchResultsTabBarItemLabel';
import SearchResultsList from '@/components/organisms/search/SearchResultsList/SearchResultsList';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { activeChannelData } from '@/mock/profile/activeChannels';
import Card from '@/components/atoms/card/Card';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import { scale } from '@/util/helper/helper';
import { useRecommendedChannels } from '@/hooks/queries/channel.queries';
import ChannelCard from '@/components/atoms/channel/ChannelCard/ChannelCard';

const renderScene = SceneMap({
	top: SearchResultsList,
	people: SearchResultsList,
	hashtags: SearchResultsList,
	postsandhub: SearchResultsList,
});

const SearchResults = ({
	navigation,
}: SearchStackScreenProps<'SearchResults'>) => {
	const { colorScheme } = useColorScheme();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [searchKeyword, setSearchKeyword] = useState('');

	const [routes] = useState([
		{ key: 'top', title: 'Top' },
		{ key: 'people', title: 'People' },
		{ key: 'hashtags', title: 'Hashtags' },
		{ key: 'postsandhub', title: 'Posts & Hubs' },
	]);

	// const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const { setDomain } = useActiveDomainAction();
	const { data: recommendedChannels } = useRecommendedChannels();
	return (
		<SafeScreen>
			<View className="flex-row items-center mx-4 my-4">
				{searchKeyword.length > 0 && <BackButton />}
				<View className="flex-1 ml-4">
					<TextInput
						placeholder="Search"
						value={searchKeyword}
						onChangeText={str => setSearchKeyword(str)}
						startIcon={<SearchIcon className="mt-[2]" />}
					/>
				</View>
				{searchKeyword.length == 0 && <BackButton /> && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {
							navigation.goBack();
						}}
						className="ml-2"
					>
						<ThemeText>Cancel</ThemeText>
					</TouchableOpacity>
				)}
			</View>
			{/* searchResultsList */}
			{searchKeyword.length > 0 ? (
				// <TabView
				// 	navigationState={{ index, routes }}
				// 	renderScene={renderScene}
				// 	onIndexChange={setIndex}
				// 	initialLayout={{ width: layout.width }}
				// 	renderTabBar={props => (
				// 		<TabBar
				// 			{...props}
				// 			scrollEnabled
				// 			indicatorStyle={{ backgroundColor: '#FF3C26' }}
				// 			style={{
				// 				borderBottomWidth: 1,
				// 				borderBottomColor:
				// 					colorScheme === 'dark' ? '#434A4F' : '#E2E8F0',
				// 			}}
				// 			tabStyle={{ width: 'auto' }}
				// 			renderLabel={({ route, focused }) => (
				// 				<SearchResultsTabBarItemLabel {...{ route, focused }} />
				// 			)}
				// 		/>
				// 	)}
				// />
				// <View className="flex-1">
				// 	<ThemeText className="text-xl font-semibold mx-8 mb-4">
				// 		Channels related to "{searchKeyword}"
				// 	</ThemeText>
				// 	<FlatList
				// 		data={activeChannelData}
				// 		renderItem={({ item }) => (
				// 			<Card
				// 				imageSource={item.image}
				// 				title={item.title}
				// 				onPress={() => {
				// 					// setDomain(item.domain_name);
				// 					// navigation.navigate('ChannelProfile', {
				// 					// 	domain_name: item.domain_name,
				// 					// });
				// 				}}
				// 				imageVariants="relatedChannels"
				// 				variants="channels"
				// 			/>
				// 		)}
				// 		keyExtractor={item => item.id.toString()}
				// 		showsHorizontalScrollIndicator={false}
				// 		contentContainerStyle={{
				// 			alignItems: 'center',
				// 			rowGap: 10,
				// 		}}
				// 		ItemSeparatorComponent={() => <View style={{ width: scale(16) }} />} // Adds spacing between cards
				// 	/>
				// </View>
				<View className="mx-6 my-2">
					{recommendedChannels ? (
						<>
							<View className="flex-row items-center">
								<ThemeText className="font-bold my-2 flex-1" size="lg_18">
									Channels related to "{searchKeyword}"
								</ThemeText>
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
			) : (
				<View className="flex-row items-center justify-center flex-1">
					<ThemeText variant="textGrey" className="text-center ">
						{
							// 'Search for people, posts, hashtags, local \n channels, global channels or hubs.'
							'Search for local channels or global channels.'
						}
					</ThemeText>
				</View>
			)}
		</SafeScreen>
	);
};

export default SearchResults;
