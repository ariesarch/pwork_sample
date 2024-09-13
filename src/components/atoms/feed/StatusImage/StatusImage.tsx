/* eslint-disable consistent-return */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Blurhash } from 'react-native-blurhash';
import SensitiveMedia from '../SensitiveMedia/SesitiveMedia';
import ThemeImage from '../../common/ThemeImage/ThemeImage';

type Props = {
	media_attachments: Pathchwork.Attachment[];
};

const DEVICE = Dimensions.get('window');

const StatusImage = ({ media_attachments }: Props) => {
	const IMAGE_LENGTH = media_attachments?.length;
	const mediaWidth = IMAGE_LENGTH === 1 ? DEVICE.width : DEVICE.width - 36;
	const [imageSensitiveState, setImageSensitiveState] = useState<{
		[id: string]: boolean;
	}>(() => {
		const initialState: { [id: string]: boolean } = {};
		media_attachments.forEach(attachment => {
			initialState[attachment.id] = attachment.sensitive as boolean;
		});
		return initialState;
	});

	const mapAttachmentType = (
		attachment: Pathchwork.Attachment,
		isSensitive: boolean,
	) => {
		const imageAttachmentUrl = {
			uri: attachment?.remote_url || attachment?.url,
		};

		const onForceViewSensitiveMedia = (imageId: string) => {
			setImageSensitiveState(prevState => ({
				...prevState,
				[imageId]: !prevState[imageId],
			}));
		};

		switch (attachment.type) {
			case 'image':
				return (
					<View>
						<Pressable
							onPress={() => (isSensitive ? null : () => {})}
							children={
								<>
									{isSensitive ? (
										<View>
											<Blurhash
												blurhash={attachment.blurhash as string}
												style={{
													width: mediaWidth,
													height: 280,
												}}
											/>
											<SensitiveMedia
												mediaType="photo"
												attachmentId={attachment.id}
												onViewSensitiveContent={onForceViewSensitiveMedia}
											/>
										</View>
									) : (
										<>
											<ThemeImage
												url={imageAttachmentUrl?.uri}
												imageStyle={{
													width: mediaWidth,
													height: 280,
												}}
												blurHash={attachment.blurhash}
											/>
											{/* {attachment.description &&
												attachment.description !== 'null' && (
													<ShowTooltips
														isVisible={
															showTip && selectedImageId === attachment.id
														}
														onViewToolTips={() => {
															setShowTip(!showTip);
															setSelectedImageId(attachment.id);
														}}
														description={attachment.description}
													/>
												)} */}
										</>
									)}
								</>
							}
						/>
					</View>
				);

			default:
				if (
					attachment.url?.match(
						/.(?:a?png|jpe?g|webp|avif|heic|gif|svg|ico|icns)$/i,
					)
				) {
					return (
						<FastImage
							source={imageAttachmentUrl}
							resizeMode="cover"
							style={{ width: mediaWidth, height: 280 }}
						/>
					);
				}
		}
	};

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={{ marginTop: 8 }}
			contentContainerStyle={{
				flexGrow: 1,
				gap: 8,
			}}
		>
			{Array.isArray(media_attachments) &&
				media_attachments?.length >= 1 &&
				media_attachments.map((media, chunkIndex) => (
					<View
						key={chunkIndex}
						style={{
							flex: 1,
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'center',
							alignContent: 'stretch',
						}}
					>
						{mapAttachmentType(media, imageSensitiveState[media.id])}
					</View>
				))}
		</ScrollView>
	);
};

// const styles = StyleSheet.create({
// 	imageSensitiveContainer: {
// 		position: 'absolute',
// 		top: 10,
// 		left: 10,
// 		justifyContent: 'center',
// 		paddingHorizontal: 8,
// 		paddingVertical: 8,
// 		borderRadius: 8,
// 	},
// 	altText: {
// 		position: 'absolute',
// 		bottom: 10,
// 		left: 10,
// 		justifyContent: 'center',
// 		paddingHorizontal: 8,
// 		paddingVertical: 8,
// 		borderRadius: 8,
// 		backgroundColor: 'rgba(0, 0, 0, 0.65)',
// 	},
// });

export default StatusImage;
