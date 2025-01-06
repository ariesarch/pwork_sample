import { calculateImageWidth } from '@/util/helper/compose';
import { cn } from '@/util/helper/twutil';
import { Pressable, View, ViewProps } from 'react-native';
import FastImage from 'react-native-fast-image';
import { memo, useState } from 'react';
import { Blurhash } from 'react-native-blurhash';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

type Props = {
	message: Patchwork.Status;
	isOwnMessage: boolean;
} & ViewProps;

const MessageImage = ({ message, isOwnMessage, ...props }: Props) => {
	const navigation = useNavigation();
	const [imageLoaded, setImageLoaded] = useState(false);

	const imageOnLoad = () => {
		setImageLoaded(true);
	};

	const imageUrls: RootStackParamList['ImageViewer']['imageUrls'] =
		message?.media_attachments
			.map(attachment => {
				switch (attachment.type) {
					case 'image':
						return {
							id: attachment.id,
							preview_url: attachment.preview_url,
							url: attachment.url,
							remote_url: attachment.remote_url,
							width: attachment.meta?.original?.width,
							height: attachment.meta?.original?.height,
							sensitive: attachment.sensitive,
						};
					default:
						if (
							attachment.preview_url?.match(
								/.(?:a?png|jpe?g|webp|avif|heic|gif|svg|ico|icns)$/i,
							) ||
							attachment.remote_url?.match(
								/.(?:a?png|jpe?g|webp|avif|heic|gif|svg|ico|icns)$/i,
							)
						) {
							return {
								id: attachment.id,
								preview_url: attachment.preview_url,
								url: attachment.url,
								remote_url: attachment.remote_url,
								width: attachment.meta?.original?.width,
								height: attachment.meta?.original?.height,
								sensitive: attachment.sensitive,
							};
						}
				}
			})
			.filter(i => i);

	return (
		<Pressable
			onPress={() =>
				navigation.navigate('ImageViewer', {
					imageUrls: imageUrls,
					id: message.media_attachments[0].id,
				})
			}
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
		</Pressable>
	);
};
export default memo(MessageImage);
