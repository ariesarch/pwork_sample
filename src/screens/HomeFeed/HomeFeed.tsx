import Chip from '@/components/atoms/common/Chip/Chip';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { mockStatusList } from '@/mock/feed/statusList';
import { useColorScheme } from 'nativewind';
import { FlatList } from 'react-native';

const HomeFeed = () => {
	const { colorScheme } = useColorScheme();
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
