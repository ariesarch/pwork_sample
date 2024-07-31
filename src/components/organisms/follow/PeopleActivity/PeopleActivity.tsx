import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import { mockStatusList } from '@/mock/feed/statusList';
import { View, FlatList } from 'react-native';

const PeopleActivity = () => {
	return (
		<View>
			<FlatList
				data={mockStatusList}
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => <StatusItem status={item} />}
			/>
		</View>
	);
};

export default PeopleActivity;
