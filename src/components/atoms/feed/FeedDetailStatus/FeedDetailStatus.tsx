import { Pressable, View } from 'react-native';
import StatusHeader from '../StatusHeader/StatusHeader';
import StatusContent from '../StatusContent/StatusContent';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import Underline from '../../common/Underline/Underline';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { useActiveFeedAction } from '@/store/feed/activeFeed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@/types/navigation';
import { useAuthStore } from '@/store/auth/authStore';

const FeedDetailStatus = ({
	feedDetail,
}: // relationships,
{
	feedDetail: Pathchwork.Status;
	// relationships: Pathchwork.RelationShip[];
}) => {
	const { userInfo } = useAuthStore();
	const { setActiveFeed } = useActiveFeedAction();
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

	const handleOnPress = (status: Pathchwork.Status) => {
		setActiveFeed(status);
		navigation.navigate('FeedDetail', { id: status.id });
	};

	return (
		<View>
			<View className="mx-4">
				<StatusHeader
					status={feedDetail}
					imageSize="w-8 h-8"
					showAvatarIcon
					// showFollowIcon={userInfo?.id !== feedDetail.account.id}
					// relationships={relationships}
				/>
				<StatusContent status={feedDetail} isFeedDetail className="mt-2" />
				{feedDetail.reblog && (
					<Pressable
						className="border border-slate-200 dark:border-patchwork-grey-70 my-2 p-3 rounded-xl"
						onPress={() => {
							handleOnPress(feedDetail.reblog!);
						}}
					>
						<StatusHeader
							imageSize="w-7 h-7"
							status={feedDetail.reblog}
							showAvatarIcon
							// relationships={relationships}
						/>
						<StatusContent status={feedDetail.reblog} className="mt-2" />
					</Pressable>
				)}
				<StatusActionBar status={feedDetail} isFeedDetail />
			</View>
			<Underline className="mt-3" />
			<ThemeText className="font-semibold ml-4 my-2">Replies</ThemeText>
			<Underline />
		</View>
	);
};

export default FeedDetailStatus;
