import React from 'react';
import { View, FlatList } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

import { scale } from '@/util/helper/helper';
import Card from '@/components/atoms/card/Card';
import { useNavigation } from '@react-navigation/native';
import { searchChannelData } from '@/mock/search/Channel';

const SearchChannels = () => {
	const navigation = useNavigation();
	
	return (
		<View>
			<FlatList
				data={searchChannelData}
				renderItem={({ item }) => (
					<Card
						imageSource={item.image}
						title={item.title}
						onPress={() => navigation.navigate('ChannelProfile')}
						className=' w-[180] h-[149]'
					/>
				)}
				keyExtractor={item => item.id}
				// horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingLeft: scale(24) }}
				numColumns={2}
			/>
		</View>
	);
};

export default SearchChannels;
