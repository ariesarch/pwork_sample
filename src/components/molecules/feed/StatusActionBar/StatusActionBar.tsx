import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatusReplyButton from '@/components/atoms/feed/StatusReply/StatusReplyButton';
import StatusReblogButton from '@/components/atoms/feed/StatusReblog/StatusReblogButton';
import StatusFavourtieButton from '@/components/atoms/feed/StatusFavourite/StatusFavourtieButton';
import StatusMenu from '@/components/atoms/feed/StatusMenu/StatusMenu';
import { cn } from '@/util/helper/twutil';
import { useMemo, useState } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import { useStatusContext } from '@/context/statusItemContext/statusItemContext';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';
import StatusShareMenu from '@/components/atoms/feed/StatusShareMenu/StatusShareMenu';
import { moderateScale } from 'react-native-size-matters';

type Props = {
	status: Patchwork.Status;
	isFromNoti?: boolean;
};

const StatusActionBar = ({ status, isFromNoti }: Props) => {
	const navigation = useNavigation();
	const { userInfo } = useAuthStore();
	const { currentPage, extraPayload } = useStatusContext();
	const [isAlertOpen, setAlert] = useState(false);
	const [isShareVisible, setShareVisible] = useState(false);

	const reblogsCount = status.reblog
		? status.reblog.reblogs_count
		: status.reblogs_count;

	const repliesCount = status.reblog
		? status.reblog.replies_count
		: status.replies_count;

	const isAuthor = useMemo(() => {
		const currentUserAccHandle = userInfo?.acct + '@channel.org';
		return (
			userInfo?.id == status.account.id ||
			status.account.acct == currentUserAccHandle
		);
	}, [status, userInfo?.id]);

	return (
		<View
			className={cn(
				`flex flex-row justify-between mt-3 items-center ${
					currentPage !== 'FeedDetail' && status.reblog ? 'ml-9' : null
				}`,
			)}
		>
			<View className="flex flex-row ">
				<StatusReplyButton
					className="mr-3"
					count={repliesCount}
					status={status}
				/>
				<StatusReblogButton
					className="mr-3"
					count={reblogsCount}
					alreadyReblogged={status.reblogged || status.reblog?.reblogged}
					onPress={() => {
						status.reblogged || status.reblog?.reblogged
							? setAlert(true)
							: navigation.navigate('Index', {
									screen: 'Compose',
									params: {
										type: 'repost',
										incomingStatus: status,
										statusCurrentPage: currentPage,
										extraPayload,
									},
							  });
					}}
				/>
				<StatusFavourtieButton className="mr-3" {...{ status, isFromNoti }} />
			</View>
			<View className="flex flex-row">
				{/* <Tranlsate className="mr-3" />
				<ShareTo className="mr-3" /> */}
				<View style={{ marginRight: moderateScale(12) }}>
					<StatusShareMenu {...{ status, isFromNoti }} />
				</View>
				<StatusMenu status={status} />
			</View>
			{isAlertOpen && (
				<CustomAlert
					message={'You have already re-posted this status!'}
					hasCancel={false}
					isVisible={isAlertOpen}
					handleCancel={() => {
						setAlert(false);
					}}
					handleOk={() => setAlert(false)}
					type="error"
				/>
			)}
		</View>
	);
};

export default StatusActionBar;
