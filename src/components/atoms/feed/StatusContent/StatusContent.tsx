/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { View, ViewProps } from 'react-native';
import HTMLParser from '../../common/ParseHtml/ParseHtml';
import StatusImage from '../StatusImage/StatusImage';
import RssContentCard from '../RssContentCard/RssContentCard';

type Props = {
	status: Pathchwork.Status;
} & ViewProps;

const StatusContent = ({ status }: Props) => {
	const isImageMissing = status?.media_attachments?.length !== 0;
	return (
		<View>
			<HTMLParser status={status} />
			{!status?.is_rss_content && status?.media_attachments?.length >= 1 && (
				<StatusImage media_attachments={status?.media_attachments} />
			)}
			{status?.is_rss_content && status?.card && (
				<RssContentCard
					meta={{
						...{
							meta: status?.card,
						},
					}}
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
						overrideStyle={{
							marginTop: 16,
						}}
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
							overrideStyle={{
								marginTop: 16,
							}}
						/>
					)}
				</View>
			)}
		</View>
	);
};

const FALLBACK_PREVIEW_IMAGE_URL =
	'https://patchwork-staging-bucket.s3.eu-west-2.amazonaws.com/default_fallback_resized.png';

export default StatusContent;
