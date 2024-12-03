import { Pressable, View } from 'react-native';
import StatusItem from '../StatusItem/StatusItem';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import FastImage from 'react-native-fast-image';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import Underline from '@/components/atoms/common/Underline/Underline';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@/types/navigation';
import { useActiveFeedAction } from '@/store/feed/activeFeed';
import { useStatusReplyStore } from '@/store/compose/statusReply/statusReplyStore';
import { useRef } from 'react';

const ReplyStatus = ({
	status,
	nextStatus,
	feedDetailId,
	isNestedNodeInclude,
}: {
	status: Pathchwork.Status;
	feedDetailId: string;
	nextStatus: Pathchwork.Status | undefined;
	isNestedNodeInclude: boolean | undefined;
}) => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const { setActiveFeed } = useActiveFeedAction();
	const { currentFocusStatus } = useStatusReplyStore();
	const isTopLevelNode =
		status.in_reply_to_id && status.in_reply_to_id == feedDetailId;

	const handleOnPress = (item: Pathchwork.Status) => {
		setActiveFeed(item);
		navigation.navigate('FeedDetail', { id: item.id });
	};

	return (
		<>
			{isTopLevelNode && <Underline />}
			{isNestedNodeInclude && (
				<View className="absolute border-l  border-slate-200 dark:border-patchwork-grey-70 left-[30] top-[0] h-full" />
			)}
			{isTopLevelNode && (
				<View className="absolute h-[30] w-[30] bg-white dark:bg-patchwork-dark-100 left-4 top-[1]" />
			)}
			<View className="m-4">
				<View className={isTopLevelNode ? 'ml-0' : 'ml-10'}>
					<View className="flex-row">
						<Pressable
							onPress={() =>
								navigation.navigate('ProfileOther', {
									id: status.account.id,
								})
							}
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
							onPress={() => handleOnPress(status)}
						>
							<StatusHeader status={status} />
							<StatusContent status={status} />
						</Pressable>
					</View>
					<View className="ml-10">
						<StatusActionBar status={status} isFeedDetail />
					</View>
				</View>
			</View>
			{nextStatus == undefined && <Underline />}
		</>
	);
};

export default ReplyStatus;
