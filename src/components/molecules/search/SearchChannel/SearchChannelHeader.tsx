import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useCollectionChannelList } from '@/hooks/queries/channel.queries';
import { SearchStackParamList } from '@/types/navigation';
import { ChevronRightIcon } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const SearchChannelHeader = () => {
	const navigation = useNavigation<StackNavigationProp<SearchStackParamList>>();
	const { data: collectionList, isSuccess } = useCollectionChannelList();

	const handleCollectionClick = (item: Pathchwork.CollectionList) => {
		navigation.navigate('CollectionDetail', {
			slug: item.attributes?.slug,
			title: item.attributes?.name,
		});
	};

	return (
		<View className="flex-1">
			{isSuccess && (
				<FlatList
					data={collectionList}
					renderItem={({ item, index }) => {
						const isLastItem = index == collectionList.length - 1;
						const isEvenLastItem = isLastItem && index % 2 === 0;
						return (
							<Pressable
								className={`rounded-md ${
									isEvenLastItem ? 'w-[45.8%] mx-2' : 'flex-1 mx-2'
								} items-center mb-3`}
								onPress={() => handleCollectionClick(item)}
							>
								<FastImage
									className="bg-patchwork-dark-50 w-full h-[150] rounded-md"
									source={{
										uri: item.attributes.avatar_image_url,
									}}
									resizeMode={FastImage.resizeMode.cover}
								/>
								<View className="absolute w-full h-[150] rounded-md bg-black opacity-30 bottom-0"></View>
								<View className="absolute bottom-0 mx-2 mb-2 flex-row items-center">
									<ThemeText
										className="flex-1 font-SourceSans3_Medium"
										size={'fs_13'}
									>
										{item.attributes.name}
										{` `}({item.attributes?.community_count})
									</ThemeText>
									<ChevronRightIcon className="ml-1" />
								</View>
							</Pressable>
						);
					}}
					keyExtractor={item => item.id.toString()}
					contentContainerStyle={{
						paddingHorizontal: 16,
						paddingVertical: 16,
					}}
					numColumns={2}
					showsVerticalScrollIndicator={false}
				/>
			)}
			{/* Need to add Skeleton loading here if not isSuccess */}
		</View>
	);
};

export default SearchChannelHeader;
