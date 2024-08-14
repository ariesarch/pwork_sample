import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import React, { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { SearchIcon } from '@/util/svg/icon.common';
import { HomeStackScreenProps } from '@/types/navigation';
import { SceneMap, TabView } from 'react-native-tab-view';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import NotiTabBarItemLabel from '@/components/atoms/notifications/NotiTabBarItemLabel/NotiTabBarItemLabel';
import NotiAll from '@/components/organisms/notifications/NotiAll/NotiAll';
import { useColorScheme } from 'nativewind';
import SearchResultsTabBarItemLabel from '@/components/atoms/search/SearchResultsTabBarItemLabel/SearchResultsTabBarItemLabel';

const renderScene = SceneMap({
	all: NotiAll,
	likes: NotiAll,
	comments: NotiAll,
	shares: NotiAll,
});

const SearchResults = ({ navigation }: HomeStackScreenProps<'SearchResults'>) => {
	const { colorScheme } = useColorScheme();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);

	const [routes] = useState([
		{ key: 'all', title: 'Top' },
		{ key: 'likes', title: 'People' },
		{ key: 'comments', title: 'Hashtags' },
		{ key: 'shares', title: 'Posts & Hubs' },
	]);

	return (
		<SafeScreen>
			<View className="flex-row items-center">
				<TextInput
					placeholder="Search ..."
					styleNW="h-[80] w-[350] mt-5 mb-2 mx-6"
					startIcon={<SearchIcon />}
				/>
			</View>
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
							borderBottomColor: colorScheme === 'dark' ? '#434A4F' : '#E2E8F0',
						}}
						tabStyle={{ width: 'auto' }}
						labelStyle={{
							width: layout.width / routes.length, // Adjust each tab label width to fit evenly
							textAlign: 'center', // Center the text within the tab
						}}
						renderLabel={({ route, focused }) => (
							<SearchResultsTabBarItemLabel {...{ route, focused }} />
						)}
					/>
				)}
			/>
		</SafeScreen>
	);
};

export default SearchResults;
