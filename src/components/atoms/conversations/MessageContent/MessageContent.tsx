import { View } from 'react-native';
import HTMLParser from '../../common/ParseHtml/ParseHtml';
import { cn } from '@/util/helper/twutil';

const MessageContent = ({
	item,
	isOwnMessage,
}: {
	item: Pathchwork.Status;
	isOwnMessage: boolean;
}) => {
	return (
		<View
			className={cn(
				'flex-1 ml-2 px-4 py-3 rounded-xl ',
				isOwnMessage
					? 'bg-patchwork-red-50 rounded-br-none'
					: 'bg-patchwork-grey-70 rounded-bl-none',
			)}
		>
			<HTMLParser status={item} />
		</View>
	);
};
export default MessageContent;
