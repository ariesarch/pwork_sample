import React from 'react';
import { View, FlatList } from 'react-native';
import Card from '@/components/atoms/card/Card';
import { useNavigation } from '@react-navigation/native';
import { searchChannelData } from '@/mock/search/channel';

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
						onPress={() =>
							navigation.navigate('ChannelProfile', {
								slug: 'https://science.channel.org',
							})
						}
						imageVariants={'searchChannels'}
					/>
				)}
				keyExtractor={item => item.id}
				contentContainerStyle={{
					alignItems: 'center',
				}}
				numColumns={2}
			/>
		</View>
	);
};

export default SearchChannels;
