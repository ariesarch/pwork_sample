import { calculateImageWidth } from '@/util/helper/compose';
import { generateTWClassForImageSize } from '@/util/helper/conversation';
import { cn } from '@/util/helper/twutil';
import { View, ViewProps } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { memo, useState } from 'react';
import { Blurhash } from 'react-native-blurhash';

type Props = {
	message: Pathchwork.Status;
	isOwnMessage: boolean;
} & ViewProps;

const MessageImage = ({ message, isOwnMessage, ...props }: Props) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const imageOnLoad = () => {
		setImageLoaded(true);
	};

	return (
		<View
			className={cn('mb-3', isOwnMessage ? 'items-end' : 'items-start ml-2')}
		>
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
								className={cn('w-full h-full rounded-md bg-patchwork-dark-50')}
								resizeMode={'cover'}
								onLoad={imageOnLoad}
							/>
							{item.blurhash && !imageLoaded && (
								<Blurhash
									decodeAsync
									blurhash={item.blurhash ?? ''}
									style={[
										{ position: 'absolute' },
										{
											height: '100%',
											width: '100%',
										},
									]}
								/>
							)}
						</View>
					);
				})}
			</View>
		</View>
	);
};
export default memo(MessageImage);
