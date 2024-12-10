import { Pressable, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import Underline from '@/components/atoms/common/Underline/Underline';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import { useActiveFeedAction } from '@/store/feed/activeFeed';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/store/auth/authStore';

const RebloggedStatus = ({ status }: { status: Pathchwork.Status }) => {
	const { userInfo } = useAuthStore();

	const { setActiveFeed } = useActiveFeedAction();
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

	const handleOnPressStatus = (status: Pathchwork.Status) => {
		setActiveFeed(status.reblog ? status.reblog : status);
		navigation.navigate('FeedDetail', {
			id: status.reblog ? status.reblog.id : status.id,
		});
	};

	return (
		<View>
			<View className="m-4">
				<View className="flex-row">
					<Pressable disabled>
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
						onPress={() => handleOnPressStatus(status)}
					>
						<StatusHeader status={status} />
						<StatusContent status={status} />
					</Pressable>
				</View>
				{status.reblog && (
					<Pressable
						className="border border-slate-200 dark:border-patchwork-grey-70 my-2 ml-10 p-3 rounded-xl"
						onPress={() => {
							handleOnPressStatus(status.reblog!);
						}}
					>
						<StatusHeader
							imageSize="w-7 h-7"
							status={status.reblog}
							showAvatarIcon
						/>
						<StatusContent status={status.reblog} className="mt-2" />
					</Pressable>
				)}
				<StatusActionBar status={status} />
			</View>
			<Underline />
		</View>
	);
};

export default RebloggedStatus;
