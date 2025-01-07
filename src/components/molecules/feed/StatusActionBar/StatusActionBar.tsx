import { Alert, View } from 'react-native';
import { ShareTo, Tranlsate } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import StatusReplyButton from '@/components/atoms/feed/StatusReply/StatusReplyButton';
import StatusReblogButton from '@/components/atoms/feed/StatusReblog/StatusReblogButton';
import StatusFavourtieButton from '@/components/atoms/feed/StatusFavourite/StatusFavourtieButton';
import StatusMenu from '@/components/atoms/feed/StatusMenu/StatusMenu';
import { cn } from '@/util/helper/twutil';
import { useMemo } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import StatusTranslate from '@/components/atoms/feed/StatusTranslate/StatusTranslate';

type Props = {
	status: Pathchwork.Status;
	isFeedDetail?: boolean;
	isFromNoti?: boolean;
};

const StatusActionBar = ({ status, isFeedDetail, isFromNoti }: Props) => {
	const navigation = useNavigation();
	const { userInfo } = useAuthStore();

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
					!isFeedDetail && status.reblog ? 'ml-9' : null
				}`,
			)}
		>
			<View className="flex flex-row ">
				<StatusReplyButton
					className="mr-3"
					count={repliesCount}
					status={status}
					isFeedDetail={isFeedDetail}
				/>
				<StatusReblogButton
					className="mr-3"
					count={reblogsCount}
					alreadyReblogged={status.reblogged || status.reblog?.reblogged}
					onPress={() => {
						status.reblogged || status.reblog?.reblogged
							? Alert.alert('You have already re-posted this status!')
							: navigation.navigate('Index', {
									screen: 'Compose',
									params: {
										type: 'repost',
										incomingStatus: status,
										isFeedDetail,
									},
							  });
					}}
				/>
				<StatusFavourtieButton
					className="mr-3"
					{...{ status, isFeedDetail, isFromNoti }}
				/>
			</View>
			<View className="flex flex-row ">
				{/* <Tranlsate className="mr-3" />
				<ShareTo className="mr-3" /> */}
				{/* {isAuthor && <StatusMenu {...{ status, isFeedDetail }} />} */}

				{status.translated_text && <StatusTranslate {...{ status }} />}
				<StatusMenu {...{ status, isFeedDetail }} />
			</View>
		</View>
	);
};

export default StatusActionBar;
