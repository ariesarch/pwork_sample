/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-useless-fragment */
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Blurhash } from 'react-native-blurhash';
import SensitiveMedia from '../SensitiveMedia/SesitiveMedia';
import ThemeImage from '../../common/ThemeImage/ThemeImage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSensitiveMediaStore } from '@/store/feed/sensitiveMediaStore';

type Props = {
	media_attachments: Patchwork.Attachment[];
	sensitive: boolean;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const StatusImage = ({ media_attachments, sensitive }: Props) => {
	const navigation = useNavigation<NavigationProps>();
	const { sensitiveMedia, toggleSensitiveMedia } = useSensitiveMediaStore();
	const length = media_attachments.length;
	const fullHeight = 232;
	const halfHeight = 232 / 2;

	// State for sensitive media
	const imageSensitiveState = media_attachments.reduce((state, attachment) => {
		state[attachment.id] =
			sensitiveMedia[attachment.id] ?? attachment.sensitive;
		return state;
	}, {} as Record<string, boolean>);

	// Handlers
	const onForceViewSensitiveMedia = (imageId: string) => {
		toggleSensitiveMedia(imageId);
	};

	const navigateToImagesViewer = (id: string) => {
		navigation.navigate('ImageViewer', {
			imageUrls: media_attachments.map(attachment => ({
				id: attachment.id,
				preview_url: attachment.preview_url,
				url: attachment.url,
				remote_url: attachment.remote_url,
				width: attachment.meta?.original?.width,
				height: attachment.meta?.original?.height,
				sensitive: attachment.sensitive,
			})),
			id,
		});
	};

	const calculateHeightForBlurHash = (
		length: number,
		index: number,
	): number => {
		if (length === 3 && index === 0) return fullHeight;
		if (length === 3 && (index === 1 || index === 2)) return halfHeight;
		return length > 2 ? halfHeight : fullHeight;
	};

	// Render Items
	const renderImage = (
		item: Patchwork.Attachment,
		imageStyle: any,
		index: number,
	) => {
		const isSensitive = sensitive && !imageSensitiveState[item.id];
		const imageAttachmentUrl = { uri: item.url || item.remote_url };

		const renderSensitiveImage = () => (
			<>
				<Blurhash
					blurhash={item.blurhash as string}
					style={{
						height: calculateHeightForBlurHash(media_attachments.length, index),
					}}
				/>
				<SensitiveMedia
					mediaType="photo"
					attachmentId={item.id}
					onViewSensitiveContent={onForceViewSensitiveMedia}
				/>
			</>
		);

		const renderNonSensitiveImage = () => (
			<View
				style={[
					imageStyle,
					item.blurhash && {
						overflow: 'hidden',
						width: '100%',
						height: '100%',
					},
				]}
			>
				<ThemeImage
					url={imageAttachmentUrl.uri!}
					blurHash={item.blurhash}
					imageStyle={{
						width: '100%',
						height: calculateHeightForBlurHash(media_attachments.length, index),
						...imageStyle,
					}}
				/>
			</View>
		);

		if (item.type === 'image') {
			return (
				<Pressable
					onPress={() => !isSensitive && navigateToImagesViewer(item.id)}
					style={{ flex: 1 }}
				>
					{isSensitive ? renderSensitiveImage() : renderNonSensitiveImage()}
				</Pressable>
			);
		}

		if (item.url?.match(/.(?:a?png|jpe?g|webp|avif|heic|gif|svg|ico|icns)$/i)) {
			return (
				<FastImage
					source={imageAttachmentUrl}
					resizeMode="cover"
					style={imageStyle}
				/>
			);
		}

		return null;
		// noted by sev: need to be confirmed
		// <ThemeText
		// 	className="text-center mt-16"
		// 	variant={'textRedUnderline'}
		// 	size={'md_16'}
		// >
		// 	Video are not displayed!
		// </ThemeText>
	};

	return (
		<View className="flex-1 rounded-xl overflow-hidden mt-1">
			{length === 3 ? (
				<View className="flex-1 flex-row space-x-1">
					{renderImage(media_attachments[0], [{ height: fullHeight }], 0)}
					<View className="flex-1 space-y-1">
						{renderImage(media_attachments[1], [{ height: halfHeight }], 1)}
						{renderImage(media_attachments[2], [{ height: halfHeight }], 2)}
					</View>
				</View>
			) : length === 4 ? (
				<View className="flex-1 flex-row space-x-1">
					<View className="flex-1 space-y-1">
						{renderImage(media_attachments[0], [{ height: halfHeight }], 0)}
						{renderImage(media_attachments[1], [{ height: halfHeight }], 1)}
					</View>
					<View className="flex-1 space-y-1">
						{renderImage(media_attachments[2], [{ height: halfHeight }], 2)}
						{renderImage(media_attachments[3], [{ height: halfHeight }], 3)}
					</View>
				</View>
			) : (
				<View className="flex-1 flex-row space-x-1">
					{media_attachments.map((attachment, index) => (
						<View key={index} className="flex-1">
							{renderImage(attachment, [{ height: fullHeight }], index)}
						</View>
					))}
				</View>
			)}
		</View>
	);
};

export default StatusImage;
