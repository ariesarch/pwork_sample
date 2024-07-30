import TabBar from '@/components/molecules/common/TabBar/TabBar';
import HomeFeedHeader from '@/components/molecules/feed/HomeFeedHeader/HomeFeedHeader';
import ChannelActivity from '@/components/template/channel/ChannelActivity/ChannelActivity';
import ChannelPeople from '@/components/template/channel/ChannelPeople/ChannelPeople';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { mockUserList } from '@/mock/feed/statusList';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const renderScene = SceneMap({
	first: ChannelPeople,
	second: ChannelActivity,
});

const Channel = () => {
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'People' },
		{ key: 'second', title: 'Activity' },
	]);

	return (
		<SafeScreen>
			<HomeFeedHeader account={mockUserList[0]} />
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={props => <TabBar {...props} />}
			/>
		</SafeScreen>
	);
};

export default Channel;
