import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useColorScheme } from 'nativewind';
import NotiTabBarItemLabel from '@/components/atoms/notifications/NotiTabBarItemLabel/NotiTabBarItemLabel';
import TabBar from '@/components/molecules/common/TabBar/TabBar';
import NotiAll from '@/components/organisms/notifications/NotiAll/NotiAll';
import NotiMentions from '@/components/organisms/notifications/NotiMentions/NotiMentions';
import NotiFollowRequest from '@/components/organisms/notifications/NotiFollowRequest/NotiFollowRequest';
import { NotificationScreenRouteProp } from '@/types/navigation';

type TabViewRoute = {
	key: string;
	title: string;
};

const Notification = ({ route }: { route: NotificationScreenRouteProp }) => {
	const tabIndex = route.params.tabIndex;
	const { colorScheme } = useColorScheme();

	const layout = useWindowDimensions();
	const [index, setIndex] = useState(tabIndex);

	const [routes] = useState<TabViewRoute[]>([
		{ key: 'all', title: 'All' },
		{ key: 'mentions', title: 'Mentions' },
		{ key: 'follow_request', title: 'Follow Requests' },
	]);

	const renderScene = ({ route }: { route: TabViewRoute }) => {
		switch (route.key) {
			case 'all':
				return <NotiAll />;
			case 'mentions':
				return <NotiMentions />;
			case 'follow_request':
				return <NotiFollowRequest />;
			default:
				return <></>;
		}
	};

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
						tabStyle={{ width: layout.width / 3.1 }}
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
