import React from 'react';
import { View, FlatList } from 'react-native';
import { Card } from '@/components/atoms';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { activeChannelData } from '@/mock/profile/activeChannels';

const Profile = () => {
	return (
		<SafeScreen>
			<View className="pl-3">
        <ThemeText className='mb-2 font-bold'>Active in these channels</ThemeText>
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
				/>
			</View>
		</SafeScreen>
	);
};

export default Profile;
