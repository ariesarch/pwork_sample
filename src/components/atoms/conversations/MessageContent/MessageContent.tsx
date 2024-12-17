import { View } from 'react-native';
import HTMLParser from '../../common/ParseHtml/ParseHtml';
import { cn } from '@/util/helper/twutil';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { extractMessage } from '@/util/helper/extractMessage';
import { cleanText } from '@/util/helper/cleanText';
import { removePrivateConvoHashtag } from '@/util/helper/handlePrivateConvoHashtag';

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
			<ThemeText>
				{removePrivateConvoHashtag(extractMessage(cleanText(item.content)))}
			</ThemeText>
			{/* <HTMLParser status={item} /> */}
		</View>
	);
};
export default MessageContent;
