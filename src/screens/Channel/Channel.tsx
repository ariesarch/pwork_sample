import ChannelHeader from '@/components/molecules/channel/ChannelHeader/ChannelHeader';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import ChannelActivity from '@/components/template/ChannelActivity/ChannelActivity';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { mockUserList } from '@/mock/feed/statusList';
import { RootScreenProps } from '@/types/navigation';
import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => <View className="bg-patchwork-dark-900" />;

const renderScene = SceneMap({
	first: FirstRoute,
	second: ChannelActivity,
});

const Channel: React.FC<RootScreenProps<'Channel'>> = ({ navigation }) => {
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
				className="mx-4"
				renderTabBar={props => <TabBar {...props} />}
			/>
		</SafeScreen>
	);
};

export default Channel;
