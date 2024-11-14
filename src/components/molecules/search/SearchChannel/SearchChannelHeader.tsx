import Card from '@/components/atoms/card/Card';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import HomeFeedHeader from '@/components/molecules/feed/HomeFeedHeader/HomeFeedHeader';
import SearchChannels from '@/components/organisms/search/Channel/SearchChannels';
import SearchEverything from '@/components/organisms/search/Everything/SearchEverything';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useRecommendedChannels } from '@/hooks/queries/channel.queries';
import { searchChannelData } from '@/mock/search/channel';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import { HomeStackParamList } from '@/types/navigation';
import { ChevronRightIcon } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Pressable, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TabView, SceneMap } from 'react-native-tab-view';

const SearchChannelHeader = () => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const { setDomain } = useActiveDomainAction();
	const { data: channelList } = useRecommendedChannels();

	const handleChannelClick = (item: Pathchwork.ChannelList) => {
		setDomain(item.attributes.domain_name);
		navigation.navigate('ChannelProfile', {
			domain_name: item.attributes.domain_name,
			channel_info: {
				avatar_image_url: item.attributes.avatar_image_url,
				banner_image_url: item.attributes.banner_image_url,
				channel_name: item.attributes.name,
			},
		});
	};

	return (
		<View className="mt-4 items-center">
			<FlatList
				data={channelList}
				renderItem={({ item }) => (
					<Pressable
						className="m-2 rounded-md"
						onPress={() => handleChannelClick(item)}
					>
						<FastImage
							className="bg-patchwork-dark-50 h-[150] w-[160] rounded-md"
							source={{
								uri: item.attributes.avatar_image_url,
							}}
							resizeMode={FastImage.resizeMode.cover}
						/>
						<View className="absolute w-[160] h-[150] rounded-md bg-black opacity-30 bottom-0"></View>
						<View className="absolute bottom-0 mx-2 mb-1 flex-row items-center">
							<ThemeText
								className="flex-1 font-SourceSans3_Medium"
								size={'fs_13'}
							>
								{item.attributes.name}
							</ThemeText>
							<ChevronRightIcon className="ml-1" />
						</View>
					</Pressable>
				)}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={
					{
						// alignItems: 'center',
					}
				}
				numColumns={2}
			/>
		</View>
	);
};

export default SearchChannelHeader;
