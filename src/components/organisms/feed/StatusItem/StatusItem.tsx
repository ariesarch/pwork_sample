import Underline from '@/components/atoms/common/Underline/Underline';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import { useAuthStore } from '@/store/auth/authStore';
import { useActiveFeedAction } from '@/store/feed/activeFeed';
import { HomeStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Image, ViewProps, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
	status: Pathchwork.Status;
	isFromNoti?: boolean;
} & ViewProps;

const StatusItem = ({ status, isFromNoti, ...props }: Props) => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const { setActiveFeed } = useActiveFeedAction();
	const { userInfo } = useAuthStore();

	const handleOnPress = (item: Pathchwork.Status) => {
		setActiveFeed(item);
		navigation.navigate('FeedDetail', { id: item.id });
	};

	return (
		<>
			<View className="m-4" {...props}>
				<View className="flex-row">
					<Pressable
						onPress={() => {
							userInfo?.id
								? navigation.navigate('Profile', { id: status.account.id })
								: navigation.navigate('ProfileOther', {
										id: status.account.id,
										isFromNoti: isFromNoti,
								  });
						}}
					>
						<FastImage
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
						<StatusHeader status={status} isFromNoti={isFromNoti} />
						<StatusContent status={status} />
					</Pressable>
				</View>
				<View className="ml-10">
					<StatusActionBar status={status} isFromNoti={isFromNoti} />
				</View>
			</View>
			<Underline />
		</>
	);
};

export default StatusItem;
