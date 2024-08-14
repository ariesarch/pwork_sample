import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import React, { useState } from 'react';
import {
	Pressable,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { useNavigation } from '@react-navigation/native';
import { SearchIcon } from '@/util/svg/icon.common';
import Underline from '@/components/atoms/common/Underline/Underline';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import { HomeStackScreenProps } from '@/types/navigation';
import { SceneMap, TabView } from 'react-native-tab-view';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import NotiTabBarItemLabel from '@/components/atoms/notifications/NotiTabBarItemLabel/NotiTabBarItemLabel';
import NotiAll from '@/components/organisms/notifications/NotiAll/NotiAll';
import { useColorScheme } from 'nativewind';
import PeopleFolllowing from '../PeopleFollowing/PeopleFollowing';

type Props = {
	account: Pathchwork.Account;
	showUnderLine?: boolean;
	customOnPress?: () => void;
};

const renderScene = SceneMap({
	all: NotiAll,
	likes: NotiAll,
	comments: NotiAll,
	shares: NotiAll,
	follows: NotiAll,
});

const SearchResults = ({
	navigation,
}: HomeStackScreenProps<'SearchResults'>) => {
	const { colorScheme } = useColorScheme();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [searchKeyword, setSearchKeyword] = useState('');

	const [routes] = useState([
		{ key: 'all', title: 'Top' },
		{ key: 'likes', title: 'People' },
		{ key: 'comments', title: 'Hashtags' },
		{ key: 'shares', title: 'Posts & Hubs' },
		{ key: 'follows', title: 'Follows' },
	]);

	return (
		<SafeScreen>
			<View className="flex-row items-center mx-4 mt-4">
				{searchKeyword.length > 0 && <BackButton />}
				<View className="flex-1 ml-4">
					<TextInput
						placeholder="Search"
						value={searchKeyword}
						onChangeText={str => setSearchKeyword(str)}
						startIcon={<SearchIcon className="mt-[2]" />}
					/>
				</View>
				{searchKeyword.length == 0 && <BackButton /> && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {
							navigation.goBack();
						}}
						className="ml-2"
					>
						<ThemeText>Cancel</ThemeText>
					</TouchableOpacity>
				)}
			</View>
			{searchKeyword.length > 0 ? (
				<TabView
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{ width: layout.width }}
					renderTabBar={props => (
						<TabBar
							{...props}
							scrollEnabled
							indicatorStyle={{ backgroundColor: '#FF3C26' }}
							style={{
								borderBottomWidth: 1,
								borderBottomColor:
									colorScheme === 'dark' ? '#434A4F' : '#E2E8F0',
							}}
							tabStyle={{ width: 'auto' }}
							renderLabel={({ route, focused }) => (
								<NotiTabBarItemLabel {...{ route, focused }} />
							)}
						/>
					)}
				/>
			) : (
				<View className="flex-row items-center justify-center flex-1">
					<ThemeText variant="textGrey" className="text-center ">
						{
							'Search for people, posts, hashtags, local \n channels, global channels or hubs.'
						}
					</ThemeText>
				</View>
			)}
		</SafeScreen>
	);
};

export default SearchResults;
