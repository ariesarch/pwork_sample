import Underline from '@/components/atoms/common/Underline/Underline';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import { useActiveFeedAction } from '@/store/feed/activeFeed';
import { HomeStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Image, ViewProps, Pressable } from 'react-native';

type Props = {
	status: Pathchwork.Status;
} & ViewProps;

const StatusItem = ({ status, ...props }: Props) => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const { setActiveFeed } = useActiveFeedAction();

	const handleOnPress = (item: Pathchwork.Status) => {
		setActiveFeed(item);
		navigation.navigate('FeedDetail', { id: item.id });
	};

	return (
		<>
			<View className="m-4" {...props}>
				<View className="flex-row">
					<Pressable
						onPress={() =>
							navigation.navigate('ProfileOther', {
								id: status.account.id,
							})
						}
					>
						<Image
							source={
								status.account.avatar
									? { uri: status.account.avatar }
									: require('../../../../../assets/images/mock/profile/profile_img.jpeg')
							}
							className="w-[33] h-[33] rounded-full bg-slate-300"
						/>
					</Pressable>
					<Pressable
						className="ml-2 flex-1"
						{...props}
						onPress={() => handleOnPress(status)}
					>
						<StatusHeader status={status} />
						<StatusContent status={status} />
					</Pressable>
				</View>
				<View className="ml-10">
					<StatusActionBar status={status} />
				</View>
			</View>
			<Underline />
		</>
	);
};

export default StatusItem;
