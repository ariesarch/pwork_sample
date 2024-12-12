/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-useless-fragment */
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Blurhash } from 'react-native-blurhash';
import SensitiveMedia from '../SensitiveMedia/SesitiveMedia';
import ThemeImage from '../../common/ThemeImage/ThemeImage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { FourImageGrid, ImageGrid, ThreeImageGrid } from '../ImageGrid';
import { getBorderRadiusStyle } from '@/util/helper/getBorderRadiusStyle';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
	media_attachments: Pathchwork.Attachment[];
	isFeedDetail?: boolean;
	sensitive: boolean;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const StatusImage = ({ media_attachments, isFeedDetail, sensitive }: Props) => {
	const navigation = useNavigation<NavigationProps>();
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

	const renderImage = (
		item: Pathchwork.Attachment,
		imageStyle: any,
		index: number,
	) => {
		const isSensitive = sensitive && !imageSensitiveState[item.id];
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
					scaleValue={
						length === 3 && index === 0 ? 0.5 : length > 2 ? 0.5 : 0.7
					}
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
						<View
							style={
								item.blurhash
									? [
											imageStyle,
											{
												overflow: 'hidden',
												width: '100%',
												height: '100%',
											},
									  ]
									: {}
							}
						>
							<ThemeImage
								url={imageAttachmentUrl.uri}
								blurHash={item.blurhash}
								imageStyle={imageStyle}
								isFeedDetail={isFeedDetail}
							/>
						</View>
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
				/>
			);
	}
};

export default StatusImage;
