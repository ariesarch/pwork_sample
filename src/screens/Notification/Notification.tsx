import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useColorScheme } from 'nativewind';
import NotiTabBarItemLabel from '@/components/atoms/notifications/NotiTabBarItemLabel/NotiTabBarItemLabel';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import NotiAll from '@/components/organisms/notifications/NotiAll/NotiAll';

const renderScene = SceneMap({
	all: NotiAll,
	metions: NotiAll,
	// comments: NotiAll,
	// shares: NotiAll,
	// follows: NotiAll,
});

const Notification = () => {
	const { colorScheme } = useColorScheme();

	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);

	const [routes] = useState([
		{ key: 'all', title: 'All' },
		{ key: 'metions', title: 'Metions' },
		// { key: 'comments', title: 'Comments' },
		// { key: 'shares', title: 'Shares' },
		// { key: 'follows', title: 'Follows' },
	]);

	return (
		<SafeScreen>
			<Header title="Notifications" leftCustomComponent={<BackButton />} />
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
						tabStyle={{ width: layout.width / 2.1 }}
						renderLabel={({ route, focused }) => (
							<NotiTabBarItemLabel {...{ route, focused }} />
						)}
					/>
				)}
			/>
		</SafeScreen>
	);
};

export default Notification;
