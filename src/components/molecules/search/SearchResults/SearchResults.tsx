import React from 'react';
import { View, FlatList } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { activeChannelData } from '@/mock/profile/activeChannels';
import { scale } from '@/util/helper/helper';
import Card from '@/components/atoms/card/Card';
import { useNavigation } from '@react-navigation/native';

const SearchResults = () => {
	const navigation = useNavigation();
	return (
		<View>
			
			<FlatList
				data={activeChannelData}
				renderItem={({ item }) => (
					<Card
						imageSource={item.image}
						title={item.title}
						onPress={() => {}}
					/>
				)}
				keyExtractor={item => item.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingLeft: scale(24) }}
			/>
		</View>
	);
};

export default SearchResults;
