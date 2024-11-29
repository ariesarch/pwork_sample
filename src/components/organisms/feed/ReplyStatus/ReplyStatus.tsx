import { Pressable, View } from 'react-native';
import StatusItem from '../StatusItem/StatusItem';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import FastImage from 'react-native-fast-image';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import Underline from '@/components/atoms/common/Underline/Underline';
import { stat } from 'fs';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import customColor from '@/util/constant/color';
import TimelineLoading from '@/components/atoms/loading/TimelineLoading';
import { StatusReplyLoading } from '@/components/atoms/loading/StatusReplyLoading';
import { useFeedDetailQuery } from '@/hooks/queries/feed.queries';
import { useSelectedDomain } from '@/store/feed/activeDomain';

const ReplyStatus = ({ status }: { status: Pathchwork.Status }) => {
	const domain_name = useSelectedDomain();
	const { data: originalStatus } = useFeedDetailQuery({
		domain_name,
		id: status.in_reply_to_id!,
		options: {
			enabled: true,
		},
	});

	return (
		<View className="">
			<View className="flex-1 m-4">
				{/* <View className="absolute border-l  border-slate-200 dark:border-patchwork-grey-70 left-[15] top-[30] h-full" /> */}
				<View className="flex-row">
					<Pressable onPress={() => {}}>
						<FastImage
							source={
								status.account.avatar
									? { uri: status.account.avatar }
									: require('../../../../../assets/images/mock/profile/profile_img.jpeg')
							}
							className="w-[33] h-[33] rounded-full bg-slate-300"
						/>
					</Pressable>
					<Pressable className="ml-2 flex-1" onPress={() => {}}>
						<StatusHeader status={status} />
						<StatusContent status={status} />
					</Pressable>
				</View>
				<View className="flex-1 ml-10">
					<StatusActionBar status={status} />
				</View>
			</View>
			{/* {originalStatus ? (
				<Pressable className="flex flex-row mx-4 my-4" onPress={() => {}}>
					<FastImage
						source={{ uri: originalStatus.account.avatar }}
						className="w-[33] h-[33] rounded-full bg-slate-300"
					/>
					<View className="ml-2 flex-1">
						<Pressable className="flex-1" onPress={() => {}}>
							<StatusHeader status={originalStatus as Pathchwork.Status} />
							<StatusContent status={originalStatus as Pathchwork.Status} />
						</Pressable>
						<StatusActionBar status={originalStatus as Pathchwork.Status} />
					</View>
				</Pressable>
			) : (
				<StatusReplyLoading />
			)} */}
			<Underline />
		</View>
	);
};

export default ReplyStatus;
