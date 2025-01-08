import { View } from 'react-native';
import { cn } from '@/util/helper/twutil';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { extractMessage } from '@/util/helper/extractMessage';
import { cleanText } from '@/util/helper/cleanText';
import { removePrivateConvoHashtag } from '@/util/helper/handlePrivateConvoHashtag';
import { useNavigation } from '@react-navigation/native';

const MessageContent = ({
	item,
	isOwnMessage,
}: {
	item: Patchwork.Status;
	isOwnMessage: boolean;
}) => {
	const navigation = useNavigation();
	const message = removePrivateConvoHashtag(
		extractMessage(cleanText(item.content)),
	);
	const { parts, links } = extractLinks(message);

	const navigateToWebView = (url: string) => {
		navigation.navigate('WebViewer', { url });
	};
	return (
		<View
			className={cn(
				'flex-1 ml-2 px-4 py-3 rounded-xl',
				isOwnMessage
					? 'bg-patchwork-red-50 rounded-br-none'
					: 'bg-patchwork-grey-70 rounded-bl-none',
			)}
		>
			<ThemeText>
				{parts.map((part, index) => {
					const isLink = links.includes(part);
					return isLink ? (
						<ThemeText
							key={index}
							className={cn('text-blue-500 underline')}
							onPress={() => navigateToWebView(part)}
						>
							{part}
						</ThemeText>
					) : (
						<ThemeText key={index}>{part}</ThemeText>
					);
				})}
			</ThemeText>
		</View>
	);
};
export default MessageContent;

// A utility function to find links in the text
const extractLinks = (text: string): { parts: string[]; links: string[] } => {
	const linkRegex = /(https?:\/\/[^\s]+)/g;
	const parts = text.split(linkRegex);
	const links = text.match(linkRegex) || [];
	return { parts, links };
};
