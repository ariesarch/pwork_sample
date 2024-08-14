import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import HashtagList from '@/components/atoms/search/HashtagList/HashtagList';
import { FireIcon } from '@/util/svg/icon.common';

const Trending = () => {
	return (
		<View>
			<View className="my-2">
				<View className="flex flex-row items-center">
					<TouchableOpacity>
						<FireIcon className="h-5 w-5" />
					</TouchableOpacity>
					<ThemeText className="font-bold my-2 flex-1 ml-3" size="lg_18">
						Trending
					</ThemeText>
				</View>
				<HashtagList />
			</View>
		</View>
	);
};

export default Trending;
