import Card from '@/components/atoms/card/Card';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import HomeFeedHeader from '@/components/molecules/feed/HomeFeedHeader/HomeFeedHeader';
import SearchChannels from '@/components/organisms/search/Channel/SearchChannels';
import SearchEverything from '@/components/organisms/search/Everything/SearchEverything';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { searchChannelData } from '@/mock/search/channel';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import { HomeStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

// const renderScene = SceneMap({
// 	first: SearchEverything,
// 	second: SearchChannels,
// });

const SearchChannelHeader = () => {
	// const layout = useWindowDimensions();
	// const [index, setIndex] = React.useState(0);
	// const [routes] = React.useState([
	// 	{ key: 'first', title: 'Everything' },
	// 	{ key: 'second', title: 'Channels' },
	// ]);
	// return (
	// 	<>
	// 		<TabView
	// 			navigationState={{ index, routes }}
	// 			renderScene={renderScene}
	// 			onIndexChange={setIndex}
	// 			initialLayout={{ width: layout.width }}
	// 			renderTabBar={props => (
	// 				<TabBar
	// 					{...props}
	// 					renderLabel={({ route, focused }) => (
	// 						<ThemeText
	// 							size="md_16"
	// 							className={`font-bold ${
	// 								focused
	// 									? 'text-black dark:text-white'
	// 									: 'text-slate-400 dark:text-patchwork-grey-100'
	// 							}`}
	// 						>
	// 							{route.title}
	// 						</ThemeText>
	// 					)}
	// 				/>
	// 			)}
	// 		/>
	// 	</>
	// );
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const { setDomain } = useActiveDomainAction();

	return (
		<View className="mt-4">
			<FlatList
				data={searchChannelData}
				renderItem={({ item }) => (
					<Card
						imageSource={item.image}
						title={item.title}
						onPress={() => {
							setDomain(item.domain_name);
							navigation.navigate('ChannelProfile', {
								domain_name: item.domain_name,
							});
						}}
						imageVariants={'searchChannels'}
					/>
				)}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={{
					alignItems: 'center',
				}}
				numColumns={2}
			/>
		</View>
	);
};

export default SearchChannelHeader;
