import { View, ViewProps, ImageProps, Image } from 'react-native';
import HTMLParser from '../../common/ParseHtml/ParseHtml';
import StatusImage from '../StatusImage/StatusImage';

type Props = {
	status: Pathchwork.Status;
} & ViewProps;

const StatusContent = ({ status, ...props }: Props) => {
	return (
		<View>
			<HTMLParser status={status} />
			{!status?.is_rss_content && status?.media_attachments?.length >= 1 && (
				<StatusImage media_attachments={status?.media_attachments} />
			)}
			{/* {status.image && (
				<View className="mt-3 h-[200]">
					<Image
						source={status.image as ImageProps}
						className="rounded-md w-full h-[200]"
					/>
				</View>
			)} */}
		</View>
	);
};

export default StatusContent;
