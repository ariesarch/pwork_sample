/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-useless-fragment */
import { memo, useState } from 'react';
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Blurhash } from 'react-native-blurhash';
import SensitiveMedia from '../SensitiveMedia/SesitiveMedia';
import ThemeImage from '../../common/ThemeImage/ThemeImage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { FourImageGrid, ImageGrid, ThreeImageGrid } from '../ImageGrid';
import { getBorderRadiusStyle } from '@/util/helper/getBorderRadiusStyle';

type Props = {
	media_attachments: Pathchwork.Attachment[];
};

const StatusImage = ({ media_attachments }: Props) => {
	const navigation = useNavigation<any>();
	const [imageSensitiveState, setImageSensitiveState] = useState<{
		[id: string]: boolean;
	}>(() => {
		const initialState: { [id: string]: boolean } = {};
		media_attachments.forEach(attachment => {
			initialState[attachment.id] = attachment.sensitive as boolean;
		});
		return initialState;
	});

	const imageUrls: RootStackParamList['ImageViewer']['imageUrls'] =
		media_attachments
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

	const navigateToImagesViewer = (id: string) => {
		navigation.navigate('ImageViewer', {
			imageUrls,
			id,
		});
	};

	const onForceViewSensitiveMedia = (imageId: string) => {
		setImageSensitiveState(prevState => ({
			...prevState,
			[imageId]: !prevState[imageId],
		}));
	};

	const MemoizedImage = memo(
		({
			item,
			imageStyle,
			index,
			isSensitive,
			onForceViewSensitiveMedia,
			navigateToImagesViewer,
		}: {
			item: Pathchwork.Attachment;
			imageStyle: any;
			index: number;
			isSensitive: boolean;
			onForceViewSensitiveMedia: (id: string) => void;
			navigateToImagesViewer: (id: string) => void;
		}) => {
			const imageAttachmentUrl = {
				uri: item?.remote_url || item?.url,
			};
			const length = media_attachments.length;

			const renderSensitiveImage = () => (
				<View style={getBorderRadiusStyle(index, length)}>
					<Blurhash
						blurhash={item.blurhash as string}
						style={{
							height: length === 3 && index === 0 ? 148 : length > 2 ? 73 : 150,
						}}
					/>
					<SensitiveMedia
						mediaType="photo"
						attachmentId={item.id}
						onViewSensitiveContent={onForceViewSensitiveMedia}
						scaleValue={length === 3 && index === 0 ? 1 : length > 2 ? 0.5 : 1}
					/>
				</View>
			);

			if (item.type === 'image') {
				return (
					<Pressable
						onPress={() => !isSensitive && navigateToImagesViewer(item.id)}
						style={{ flex: 1 }}
					>
						{isSensitive ? (
							renderSensitiveImage()
						) : (
							<ThemeImage
								url={imageAttachmentUrl.uri}
								blurHash={item.blurhash}
								imageStyle={imageStyle}
							/>
						)}
					</Pressable>
				);
			} else if (
				item.url?.match(/.(?:a?png|jpe?g|webp|avif|heic|gif|svg|ico|icns)$/i)
			) {
				return (
					<FastImage
						source={imageAttachmentUrl}
						resizeMode="cover"
						style={imageStyle}
					/>
				);
			}

			return null;
		},
	);

	const renderImage = (
		item: Pathchwork.Attachment,
		imageStyle: any,
		index: number,
	) => {
		const isSensitive = imageSensitiveState[item.id];
		return (
			<MemoizedImage
				item={item}
				imageStyle={imageStyle}
				index={index}
				isSensitive={isSensitive}
				onForceViewSensitiveMedia={onForceViewSensitiveMedia}
				navigateToImagesViewer={navigateToImagesViewer}
			/>
		);
	};

	switch (media_attachments.length) {
		case 3:
			return (
				<ThreeImageGrid
					media_attachments={media_attachments}
					renderImage={renderImage}
				/>
			);
		case 2:
			return (
				<ImageGrid
					media_attachments={media_attachments}
					renderImage={renderImage}
					numColumns={2}
					imageHeight={150}
				/>
			);
		case 4:
			return (
				<FourImageGrid
					media_attachments={media_attachments}
					renderImage={renderImage}
				/>
			);
		default:
			return (
				<ImageGrid
					media_attachments={media_attachments}
					renderImage={renderImage}
					numColumns={1}
					imageHeight={150}
				/>
			);
	}
};

export default StatusImage;
