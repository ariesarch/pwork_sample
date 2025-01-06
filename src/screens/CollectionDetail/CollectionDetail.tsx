import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import CollectionChannelLoading from '@/components/atoms/loading/CollectionChannelLoading';
import { EmptyListComponent } from '@/components/molecules/search/EmptyListItem/EmptyListItem';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useDetailChannelList } from '@/hooks/queries/channel.queries';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import { SearchStackScreenProps } from '@/types/navigation';
import { ensureHttp } from '@/util/helper/helper';
import { ChevronRightIcon } from '@/util/svg/icon.common';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const CollectionDetail: React.FC<
	SearchStackScreenProps<'CollectionDetail'>
> = ({ route, navigation }) => {
	const { slug, title } = route.params;
	const { setDomain } = useActiveDomainAction();
	const {
		data: collectionList,
		isLoading,
		isSuccess,
	} = useDetailChannelList({ slug });

	const handleChannelClick = (item: Patchwork.ChannelList) => {
		setDomain(item.attributes.domain_name);

		navigation.navigate('ChannelProfile', {
			domain_name: ensureHttp(item.attributes.domain_name),
			channel_info: {
				avatar_image_url: item.attributes.avatar_image_url,
				banner_image_url: item.attributes.banner_image_url,
				channel_name: item.attributes.name,
			},
		});
	};

	return (
		<SafeScreen>
			<Header title={title} leftCustomComponent={<BackButton />} />
			<View className="flex-1">
				{isLoading ? (
					<CollectionChannelLoading />
				) : (
					collectionList &&
					isSuccess && (
						<FlatList
							data={collectionList}
							ListEmptyComponent={EmptyListComponent}
							renderItem={({ item, index }) => {
								const isLastItem = index == collectionList.length - 1;
								const isEvenLastItem = isLastItem && index % 2 === 0;
								return (
									<Pressable
										className={`rounded-md ${
											isEvenLastItem ? 'w-[45.8%] mx-2' : 'flex-1 mx-2'
										} items-center mb-3`}
										onPress={() => handleChannelClick(item)}
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
					)
				)}
				{/* Need to add Skeleton loading here if not isSuccess */}
			</View>
		</SafeScreen>
	);
};

export default CollectionDetail;
