import React from 'react';
import { View, ScrollView, ViewProps, FlatList } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useNavigation } from '@react-navigation/native';
import { scale } from '@/util/helper/helper';
import { searchChannelData } from '@/mock/search/Channel';
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
					<FlatList
						data={searchChannelData}
						renderItem={({ item }) => (
							<Card
								imageSource={item.image}
								title={item.title}
								onPress={() => navigation.navigate('ChannelProfile')}
							/>
						)}
						keyExtractor={item => item.id}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingLeft: scale(24) }}
				// numColumns={numColumns}
					/>
		</View>
	);
};

export default Browsing;