import { View } from 'react-native';
import StatusFavourite from '@/components/atoms/feed/StatusFavourite/StatusFavourite';
import StatusReblog from '@/components/atoms/feed/StatusReblog/StatusReblog';
import StatusReply from '@/components/atoms/feed/StatusReply/StatusReply';
import { ShareTo, Tranlsate } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import StatusMenu from '@/components/atoms/feed/StatusMenu/StatusMenu';

type Props = {
	status: Pathchwork.Status;
};

const StatusActionBar = ({ status }: Props) => {
	const navigation = useNavigation();

	return (
		<View className="flex flex-row justify-between mt-3 items-center">
			<View className="flex flex-row ">
				<StatusReply className="mr-3" count={status.replies_count} />
				<StatusReblog
					className="mr-3"
					count={status.reblogs_count}
					onPress={() =>
						navigation.navigate('Index', {
							screen: 'Compose',
							params: { type: 'repost', incomingStatus: status },
						})
					}
				/>
				<StatusFavourite className="mr-3" {...{ status }} />
			</View>
			<View className="flex flex-row ">
				<Tranlsate className="mr-3" />
				<ShareTo className="mr-3" />
				<StatusMenu {...{ status }} />
			</View>
		</View>
	);
};

export default StatusActionBar;
