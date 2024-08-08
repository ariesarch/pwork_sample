import HomeFeedHeader from '@/components/molecules/feed/HomeFeedHeader/HomeFeedHeader';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import PeopleActivity from '@/components/organisms/follow/PeopleActivity/PeopleActivity';
import FollowedPeople from '@/components/organisms/follow/FollowedPeople/FollowedPeople';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { mockUserList } from '@/mock/feed/statusList';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

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
			<HomeFeedHeader account={mockUserList[0]} />
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
		</SafeScreen>
	);
};

export default PeopleFolllowing;
