import { View } from 'react-native';
import { MoreBtn, ShareTo, Tranlsate } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import StatusReplyButton from '@/components/atoms/feed/StatusReply/StatusReplyButton';
import StatusReblogButton from '@/components/atoms/feed/StatusReblog/StatusReblogButton';
import StatusFavourtieButton from '@/components/atoms/feed/StatusFavourite/StatusFavourtieButton';

type Props = {
	status: Pathchwork.Status;
	isFeedDetail?: boolean;
};

const StatusActionBar = ({ status, isFeedDetail }: Props) => {
	const navigation = useNavigation();

	return (
		<View className="flex flex-row justify-between mt-3 items-center">
			<View className="flex flex-row ">
				<StatusReplyButton
					className="mr-3"
					count={status.replies_count}
					status={status}
					isFeedDetail={isFeedDetail}
				/>
				<StatusReblogButton
					className="mr-3"
					count={status.reblogs_count}
					onPress={() =>
						navigation.navigate('Index', {
							screen: 'Compose',
							params: { type: 'repost', incomingStatus: status },
						})
					}
				/>
				<StatusFavourtieButton
					className="mr-3"
					count={status.favourites_count}
				/>
			</View>
			<View className="flex flex-row ">
				<Tranlsate className="mr-3" />
				<ShareTo className="mr-3" />
				<MoreBtn />
			</View>
		</View>
	);
};

export default StatusActionBar;
