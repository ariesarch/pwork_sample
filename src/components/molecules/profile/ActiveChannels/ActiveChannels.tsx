import React from 'react';
import { View, FlatList } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { activeChannelData } from '@/mock/profile/activeChannels';
import { Card } from '@/components/atoms';
import { scale } from '@/util/helper/helper';

const ActiveChannels = () => {
	return (
		<View>
			<ThemeText className="pl-3 mb-3 font-semibold leading-[17.6px]">Active in these channels</ThemeText>
			<FlatList
				data={activeChannelData}
				renderItem={({ item }) => (
					<Card
						imageSource={item.image}
						title={item.title}
						onPress={() => console.log(item.title)}
					/>
				)}
				keyExtractor={item => item.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingLeft: scale(33) }}
			/>
		</View>
	);
};

export default ActiveChannels;
