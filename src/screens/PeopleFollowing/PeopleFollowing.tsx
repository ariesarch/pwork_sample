import ChannelHeader from '@/components/molecules/feed/HomeFeedHeader/HomeFeedHeader';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import PeopleActivity from '@/components/organisms/follow/PeopleActivity/PeopleActivity';
import FollowedPeople from '@/components/organisms/follow/FollowedPeople/FollowedPeople';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { mockUserList } from '@/mock/feed/statusList';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const renderScene = SceneMap({
	first: FollowedPeople,
	second: PeopleActivity,
});

const PeopleFolllowing = () => {
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'People' },
		{ key: 'second', title: 'Activity' },
	]);

	return (
		<SafeScreen>
			<ChannelHeader account={mockUserList[0]} />
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

export default PeopleFolllowing;
