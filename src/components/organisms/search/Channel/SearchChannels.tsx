import React from 'react';
import { View, FlatList } from 'react-native';
import Card from '@/components/atoms/card/Card';
import { useNavigation } from '@react-navigation/native';
import { searchChannelData } from '@/mock/search/channel';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@/types/navigation';

const SearchChannels = () => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

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
								domain_name: item.domain_name,
							})
						}
						imageVariants={'searchChannels'}
					/>
				)}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={{
					alignItems: 'center',
				}}
				numColumns={2}
			/>
		</View>
	);
};

export default SearchChannels;
