import { calculateImageWidth } from '@/util/helper/compose';
import { generateTWClassForImageSize } from '@/util/helper/conversation';
import { cn } from '@/util/helper/twutil';
import { View, ViewProps } from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
	message: Pathchwork.Status;
	isOwnMessage: boolean;
} & ViewProps;

const MessageImage = ({ message, isOwnMessage, ...props }: Props) => {
	return (
		<View className={cn('flex-1', isOwnMessage ? 'items-end' : 'items-start')}>
			<View className="w-3/4 flex-row flex-wrap rounded-xl overflow-hidden">
				{message.media_attachments.map((item, idx) => {
					return (
						<View
							className={cn(
								'border-patchwork-dark-100 border-2 rounded-xl',
								calculateImageWidth(message.media_attachments, idx),
							)}
							key={idx}
						>
							<FastImage
								source={{ uri: item.url }}
								className={cn('w-full h-full rounded-md')}
								resizeMode={'cover'}
							/>
						</View>
					);
				})}
			</View>
		</View>
	);
};
export default MessageImage;
