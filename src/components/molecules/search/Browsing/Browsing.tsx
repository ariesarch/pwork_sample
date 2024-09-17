import React from 'react';
import { View, ScrollView, ViewProps, FlatList } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useNavigation } from '@react-navigation/native';
import { scale } from '@/util/helper/helper';
import { searchChannelData } from '@/mock/search/channel';
import Card from '@/components/atoms/card/Card';

const Browsing = ({ ...props }: ViewProps) => {
	const navigation = useNavigation();
	// const numColumns = 2;
	return (
		<View>
			<View className="ml-6 my-2">
				<View className="flex flex-row items-center">
					<ThemeText className="font-bold my-2 flex-1" size="lg_18">
						Start browsing
					</ThemeText>
				</View>
			</View>
			<ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						flexWrap: 'wrap',
					}}
				>
					{searchChannelData.map((item, idx) => (
						<Card
							key={idx}
							imageSource={item.image}
							title={item.title}
							onPress={() =>
								navigation.navigate('ChannelProfile', {
									slug: item.slug,
								})
							}
							imageVariants="browsing"
						/>
					))}
				</View>
			</ScrollView>
			{/* <FlatList
				data={searchChannelData}
				renderItem={({ item }) => (
					<Card
						imageSource={item.image}
						title={item.title}
						onPress={() => {}}
						className="w-[149] h-20"
					/>
				)}
				keyExtractor={item => item.id}
				// horizontal
				// showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingLeft: scale(24) }}
				numColumns={2}
			/> */}
		</View>
	);
};

export default Browsing;
