import ChannelHeader from '@/components/molecules/channel/ChannelHeader/ChannelHeader';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { mockUserList } from '@/mock/feed/statusList';
import { RootScreenProps } from '@/types/navigation';
import { View } from 'react-native';

const Channel: React.FC<RootScreenProps<'Channel'>> = ({ navigation }) => {
	return (
		<SafeScreen>
			<View>
				<ChannelHeader account={mockUserList[0]} />
			</View>
		</SafeScreen>
	);
};

export default Channel;
