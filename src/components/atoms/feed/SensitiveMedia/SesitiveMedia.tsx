import { MediaSensitiveDisbaleIcon } from '@/util/svg/icon.common';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';

type Props = {
	attachmentId: Pathchwork.Attachment['id'];
	mediaType: 'photo' | 'video';
	onViewSensitiveContent: (attachmentId: string) => void;
	onViewMastodonSensitiveContent?: () => void;
	sensitiveFromMastodon?: boolean;
	scaleValue?: number;
};

const SensitiveMedia: React.FC<Props> = ({
	attachmentId,
	mediaType = 'photo',
	onViewSensitiveContent,
	onViewMastodonSensitiveContent,
	sensitiveFromMastodon,
	scaleValue = 1,
}) => {
	return (
		<View style={styles.sensitiveContainer}>
			{/* <View>
				<MediaSensitiveDisbaleIcon />
			</View> */}

			<View className="items-center">
				<ThemeText
					style={{ fontSize: scaleValue < 1 ? 8 : 12 }}
					className="font-bold text-white items-center"
				>
					This {mediaType === 'photo' ? 'photo' : 'video'} may include sensitive
					content
				</ThemeText>
			</View>
			<Pressable
				onPress={
					sensitiveFromMastodon
						? onViewMastodonSensitiveContent
						: () => onViewSensitiveContent(attachmentId)
				}
				style={{ marginTop: scaleValue < 1 ? -25 : 0 }}
			>
				<View
					style={[
						styles.forceViewSensitiveButton,
						{ transform: [{ scale: scaleValue }] },
					]}
				>
					<ThemeText className="font-bold text-white">View anyway</ThemeText>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	sensitiveContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	forceViewSensitiveButton: {
		backgroundColor: 'rgba(54, 70, 99, 0.4)',
		borderWidth: 0,
		borderRadius: 50,
		width: 120,
		height: 35,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 24,
		margin: 3,
		color: '#42454F',
	},
});

export default SensitiveMedia;
