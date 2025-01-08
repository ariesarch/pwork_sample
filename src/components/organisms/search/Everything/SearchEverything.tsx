import React from 'react';
import { View } from 'react-native';
import SeggestedPeopleList from '@/components/molecules/search/SuggestedPeople/SuggestedPeopleList';
import Trending from '@/components/molecules/search/Trending/Trending';
import { FlashList } from '@shopify/flash-list';
import { searchChannelData } from '@/mock/search/channel';
import { keyExtractor } from '@/util/helper/helper';
import Card from '@/components/atoms/card/Card';
import { useNavigation } from '@react-navigation/native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@/types/navigation';
import { useActiveDomainAction } from '@/store/feed/activeDomain';

const SearchEverything = () => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const { setDomain } = useActiveDomainAction();

	const renderListHeaderComponent = () => {
		return (
			<View>
				<Trending />
				<ThemeText className="font-SourceSans3_Bold my-2" size="lg_18">
					Start browsing
				</ThemeText>
			</View>
		);
	};

	const renderListFooterComponent = () => {
		return <SeggestedPeopleList />;
	};
	return (
		<View className="flex-1 ml-6">
			<FlashList
				showsVerticalScrollIndicator={false}
				data={searchChannelData}
				keyExtractor={keyExtractor}
				renderItem={({ item }) => (
					<Card
						imageSource={item.image}
						title={item.title}
						onPress={() => {
							// setDomain(item.domain_name);
							// navigation.navigate('ChannelProfile', {
							// 	domain_name: item.domain_name,
							// });
						}}
						imageVariants={'browsing'}
						variants={'browsing'}
						gutters={'mr4'}
					/>
				)}
				estimatedItemSize={100}
				numColumns={2}
				ListHeaderComponent={renderListHeaderComponent}
				ListFooterComponent={renderListFooterComponent}
			/>
		</View>
	);
};

export default SearchEverything;
