import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useRecommendedChannels } from '@/hooks/queries/channel.queries';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import { SearchStackParamList } from '@/types/navigation';
import { ChevronRightIcon } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const SearchChannelHeader = () => {
	const navigation = useNavigation<StackNavigationProp<SearchStackParamList>>();
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
		<View className="mt-4 mx-6">
			<FlatList
				data={channelList}
				renderItem={({ item, index }) => (
					<Pressable
						className="rounded-md"
						style={{
							width: '48%',
							marginRight: index % 2 == 0 ? '3%' : 0,
							marginBottom: '3%',
						}}
						onPress={() => handleChannelClick(item)}
					>
						<FastImage
							className="bg-patchwork-dark-50 h-[150]  rounded-md"
							source={{
								uri: item.attributes.avatar_image_url,
							}}
							resizeMode={FastImage.resizeMode.cover}
						/>
						<View className="absolute  h-[150] rounded-md bg-black opacity-30 bottom-0"></View>
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
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default SearchChannelHeader;
