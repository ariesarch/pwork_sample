/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Pressable, View, ViewProps } from 'react-native';
import HTMLParser from '../../common/ParseHtml/ParseHtml';
import StatusImage from '../StatusImage/StatusImage';
import RssContentCard from '../RssContentCard/RssContentCard';
import NotiStatusImageView from '../../notifications/NotiStatusImageView/NotiStatusImageView';
import { useActiveFeedAction } from '@/store/feed/activeFeed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@/types/navigation';
import PollVotingStatus from '@/components/organisms/poll/PollVotingStatus/PollVotingStatus';

type Props = {
	status: Pathchwork.Status;
	isFromNotiStatusImage?: boolean;
	isFeedDetail?: boolean;
	isReposting?: boolean;
} & ViewProps;

const StatusContent = ({
	status,
	isFromNotiStatusImage,
	isFeedDetail,
	isReposting,
}: Props) => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const isImageMissing = status?.media_attachments?.length !== 0;
	const { setActiveFeed } = useActiveFeedAction();

	const handlePressStatus = () => {
		setActiveFeed(status.reblog ? status.reblog : status);
		navigation.navigate('FeedDetail', {
			id: status.reblog ? status.reblog.id : status.id,
		});
	};

	return (
		<View>
			<Pressable onPress={handlePressStatus} disabled={isReposting}>
				<HTMLParser status={status} />
				{status?.poll && (
					<PollVotingStatus
						status={status}
						isFeedDetail={isFeedDetail}
						isReposting={isReposting}
					/>
				)}
				{!status?.is_rss_content &&
					status?.media_attachments?.length >= 1 &&
					(!isFromNotiStatusImage ? (
						<View className="h-[150]">
							<StatusImage
								media_attachments={status?.media_attachments}
								isFeedDetail={isFeedDetail}
								sensitive={status?.sensitive}
							/>
						</View>
					) : (
						<NotiStatusImageView {...{ status }} />
					))}
				{status?.is_rss_content && status?.card && (
					<RssContentCard
						meta={{
							...{
								meta: status?.card,
							},
						}}
						isFeedDetail={isFeedDetail}
					/>
				)}
				{status?.is_rss_content &&
					!status?.card &&
					status?.media_attachments?.length >= 1 && (
						<RssContentCard
							{...{
								meta: {
									title: status?.meta_title,
									image: status?.image_url || FALLBACK_PREVIEW_IMAGE_URL,
									url: status?.rss_link,
								},
							}}
							extraStyle="mt-4"
							isFeedDetail={isFeedDetail}
						/>
					)}
				{!isImageMissing && !status?.is_rss_content && status?.card && (
					<View>
						{status?.card && (
							<RssContentCard
								{...{
									meta: {
										image: status?.card?.image || FALLBACK_PREVIEW_IMAGE_URL,
										title: status?.card?.title,
										url: status?.card?.url,
										blurhash: status?.card?.blurhash,
									},
								}}
								extraStyle="mt-4"
								isFeedDetail={isFeedDetail}
							/>
						)}
					</View>
				)}
			</Pressable>
		</View>
	);
};

const FALLBACK_PREVIEW_IMAGE_URL =
	'https://patchwork-staging-bucket.s3.eu-west-2.amazonaws.com/default_fallback_resized.png';

export default StatusContent;
