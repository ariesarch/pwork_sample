import AccountAvatar from '@/components/molecules/feed/AccountAvatar/AccountAvatar';
import { mockUserList } from '@/mock/feed/statusList';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ChannelPeople = () => {
	return (
		<View className="my-4">
			<FlatList
				data={mockUserList}
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				numColumns={3}
				renderItem={({ item }) => (
					<AccountAvatar
						account={item}
						size={25}
						dotAlert={!!item.hasNoti}
						className="m-4"
					/>
				)}
			/>
		</View>
	);
};

export default ChannelPeople;
