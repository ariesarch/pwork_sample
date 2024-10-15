import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import React, { useState } from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { SearchIcon } from '@/util/svg/icon.common';
import {
	HomeStackScreenProps,
	SearchStackScreenProps,
} from '@/types/navigation';
import { SceneMap, TabView } from 'react-native-tab-view';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import NotiTabBarItemLabel from '@/components/atoms/notifications/NotiTabBarItemLabel/NotiTabBarItemLabel';
import NotiAll from '@/components/organisms/notifications/NotiAll/NotiAll';
import { useColorScheme } from 'nativewind';
import SearchResultsTabBarItemLabel from '@/components/atoms/search/SearchResultsTabBarItemLabel/SearchResultsTabBarItemLabel';
import SearchResultsList from '@/components/organisms/search/SearchResultsList/SearchResultsList';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

const renderScene = SceneMap({
	top: SearchResultsList,
	people: SearchResultsList,
	hashtags: SearchResultsList,
	postsandhub: SearchResultsList,
});

const SearchResults = ({
	navigation,
}: SearchStackScreenProps<'SearchResults'>) => {
	const { colorScheme } = useColorScheme();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [searchKeyword, setSearchKeyword] = useState('');

	const [routes] = useState([
		{ key: 'top', title: 'Top' },
		{ key: 'people', title: 'People' },
		{ key: 'hashtags', title: 'Hashtags' },
		{ key: 'postsandhub', title: 'Posts & Hubs' },
	]);

	return (
		<SafeScreen>
			<View className="flex-row items-center mx-4 my-4">
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
			{/* {searchKeyword.length > 0 ? (
				<TabView
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{ width: layout.width }}
					renderTabBar={props => (
						<TabBar
							{...props}
							scrollEnabled
							indicatorStyle={{ backgroundColor: '#FF3C26'}}
						style={{
								borderBottomWidth: 1,
								borderBottomColor:
									colorScheme === 'dark' ? '#434A4F' : '#E2E8F0',
							}}
							tabStyle={{ width: 'auto' }}
							renderLabel={({ route, focused }) => (
								<SearchResultsTabBarItemLabel {...{ route, focused }} />
							)}
						/>
					)}
				/>
			) : ( */}
			<View className="flex-row items-center justify-center flex-1">
				<ThemeText variant="textGrey" className="text-center ">
					{
						'Search for people, posts, hashtags, local \n channels, global channels or hubs.'
					}
				</ThemeText>
			</View>
			{/* )} */}
		</SafeScreen>
	);
};

export default SearchResults;
