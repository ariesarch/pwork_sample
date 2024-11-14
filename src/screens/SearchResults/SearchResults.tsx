import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import React, { useEffect, useState } from 'react';
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
	HomeStackParamList,
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
import {
	useRecommendedChannels,
	useSearchChannel,
} from '@/hooks/queries/channel.queries';
import ChannelCard from '@/components/atoms/channel/ChannelCard/ChannelCard';
import ChannelLoading from '@/components/atoms/loading/ChannelLoading';
import { ScrollView } from 'react-native-gesture-handler';
import useDebounce from '@/hooks/custom/useDebounce';
import Keyword from '@/components/atoms/common/Keyword/Keyword';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';

const SearchResults = ({
	navigation,
}: SearchStackScreenProps<'SearchResults'>) => {
	const { colorScheme } = useColorScheme();
	const [searchKeyword, setSearchKeyword] = useState('');
	const [finalKeyword, setFinalKeyword] = useState('');
	const { setDomain } = useActiveDomainAction();
	const { data: searchChannelRes, isFetching: isSearching } = useSearchChannel({
		searchKeyword: finalKeyword,
		enabled: finalKeyword.length > 0,
	});
	const startDebounce = useDebounce();

	useEffect(() => {
		startDebounce(() => {
			setFinalKeyword(searchKeyword);
		}, 500);
	}, [searchKeyword]);

	return (
		<SafeScreen>
			<View className="flex-row items-center mx-4 my-4">
				{searchKeyword.length > 0 && (
					<BackButton
						customOnPress={() => {
							navigation.goBack();
						}}
					/>
				)}
				<View className="flex-1 ml-4">
					<TextInput
						placeholder="Search"
						value={searchKeyword}
						onChangeText={str => setSearchKeyword(str)}
						startIcon={<SearchIcon className="mt-[2]" />}
						autoCapitalize="none"
					/>
				</View>
				{searchKeyword.length == 0 && (
						<BackButton
							customOnPress={() => {
								navigation.goBack();
							}}
						/>
					) && (
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
			{searchKeyword.length > 0 ? (
				<View className="mx-6 my-2">
					{!isSearching && searchChannelRes && (
						<>
							<View className="flex-row items-center">
								<ThemeText className="font-bold my-2 flex-1" size="lg_18">
									{`Channels related to ${searchKeyword}`}
								</ThemeText>
							</View>
							<ScrollView
								className="mb-[140]"
								showsVerticalScrollIndicator={false}
							>
								{searchChannelRes.map((item, idx) => (
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
							</ScrollView>
						</>
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
			{isSearching && (
				<View className="mx-6 my-2 items-center mt-5">
					<Flow size={50} color={customColor['patchwork-red-50']} />
				</View>
			)}
		</SafeScreen>
	);
};

export default SearchResults;
