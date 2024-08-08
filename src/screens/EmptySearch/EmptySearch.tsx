import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { useNavigation } from '@react-navigation/native';
import { SearchIcon } from '@/util/svg/icon.common';
import Underline from '@/components/atoms/common/Underline/Underline';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

type Props = {
	account: Pathchwork.Account;
	showUnderLine?: boolean;
	customOnPress?: () => void;
};

const EmptySearch = ({ customOnPress = undefined }: Props) => {
	const navigation = useNavigation();

	return (
		<SafeScreen>
			<View className="flex-row items-center">
				<TextInput
					placeholder="Search ..."
					styleNW="h-[80] w-[350] mt-5 mb-2 mx-6"
					startIcon={<SearchIcon />}
					onPress={() => navigation.navigate('SearchResults')}
				/>

				<TouchableOpacity
					className="right-2"
					onPress={() =>
						customOnPress ? customOnPress() : navigation.goBack()
					}
				>
					<ThemeText>Cancel</ThemeText>
				</TouchableOpacity>
			</View>
			{/* {showUnderLine && <Underline className="mt-2" />} */}
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					padding: 16,
				}}
			>
				<ThemeText className="text-align justify-center ">
					Search for people, posts, hashtags, local
				</ThemeText>
				<ThemeText className="text-align justify-center ">
					channels, global channels or hubs.
				</ThemeText>
			</View>
		</SafeScreen>
	);
};

export default EmptySearch;
