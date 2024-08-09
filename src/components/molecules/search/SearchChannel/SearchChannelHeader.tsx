import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import HomeFeedHeader from '@/components/molecules/feed/HomeFeedHeader/HomeFeedHeader';
import SearchChannels from '@/components/organisms/search/Channel/SearchChannels';
import SearchEverything from '@/components/organisms/search/Everything/SearchEverything';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const renderScene = SceneMap({
	first: SearchEverything,
	second: SearchChannels,
});

const SearchChannelHeader = () => {
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'Everything' },
		{ key: 'second', title: 'Channels' },
	]);

	return (
		<>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={props => (
					<TabBar
						{...props}
						renderLabel={({ route, focused }) => (
							<ThemeText
								size="md_16"
								className={`font-bold ${
									focused
										? 'text-black dark:text-white'
										: 'text-slate-400 dark:text-patchwork-grey-100'
								}`}
							>
								{route.title}
							</ThemeText>
						)}
					/>
				)}
			/>
		</>
	);
};

export default SearchChannelHeader;
