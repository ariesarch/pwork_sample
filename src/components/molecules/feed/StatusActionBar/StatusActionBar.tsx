import { View } from 'react-native';
import StatusFavourtie from '@/components/atoms/feed/StatusFavourite/StatusFavourite';
import StatusReblog from '@/components/atoms/feed/StatusReblog/StatusReblog';
import StatusReply from '@/components/atoms/feed/StatusReply/StatusReply';
import { MoreBtn, ShareTo, Tranlsate } from '@/util/svg/icon.common';

const StatusActionBar = () => {
	return (
		<View className="flex flex-row justify-between mt-3 items-center">
			<View className="flex flex-row ">
				<StatusReply className="mr-3" />
				<StatusReblog className="mr-3" />
				<StatusFavourtie className="mr-3" />
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
