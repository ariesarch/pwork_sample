import React from 'react';
import { View, FlatList } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { activeChannelData } from '@/mock/profile/activeChannels';
import { scale } from '@/util/helper/helper';
import Card from '@/components/atoms/card/Card';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

const ActiveChannels = () => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	return (
		<View>
			<ThemeText className="pl-4 mb-3 font-semibold leading-[17.6px]">
				Active in these channels
			</ThemeText>
			<FlatList
				data={activeChannelData}
				renderItem={({ item }) => (
					<Card
						imageSource={item.image}
						title={item.title}
						onPress={() =>
							navigation.navigate('ChannelProfile', {
								domain_name: item.domain_name,
							})
						}
					/>
				)}
				keyExtractor={item => item.id.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingLeft: scale(24) }}
			/>
		</View>
	);
};

export default ActiveChannels;
