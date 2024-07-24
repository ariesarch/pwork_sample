import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { mockStatusList } from '@/mock/feed/statusList';
import { FlatList } from 'react-native';

const HomeFeed = () => {
	return (
		<SafeScreen>
			<FlatList
				data={mockStatusList}
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => <StatusItem status={item} />}
			/>
		</SafeScreen>
	);
};

export default HomeFeed;
