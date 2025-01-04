import { MediaSensitiveDisbaleIcon } from '@/util/svg/icon.common';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';

type Props = {
	attachmentId: Patchwork.Attachment['id'];
	mediaType: 'photo' | 'video';
	onViewSensitiveContent: (attachmentId: string) => void;
	onViewMastodonSensitiveContent?: () => void;
	sensitiveFromMastodon?: boolean;
};

const SensitiveMedia: React.FC<Props> = ({
	attachmentId,
	mediaType = 'photo',
	onViewSensitiveContent,
	onViewMastodonSensitiveContent,
	sensitiveFromMastodon,
}) => {
	return (
		<View style={styles.sensitiveContainer}>
			{/* <View>
				<MediaSensitiveDisbaleIcon />
			</View> */}
			<ThemeText size={'xs_12'} className="font-bold text-white text-center">
				This {mediaType === 'photo' ? 'photo' : 'video'} may include sensitive
				content
			</ThemeText>
			<Pressable
				onPress={
					sensitiveFromMastodon
						? onViewMastodonSensitiveContent
						: () => onViewSensitiveContent(attachmentId)
				}
				style={[styles.forceViewSensitiveButton]}
			>
				<ThemeText size={'xs_12'} className="font-bold text-white">
					View anyway
				</ThemeText>
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
		paddingHorizontal: 5,
	},
	forceViewSensitiveButton: {
		backgroundColor: 'rgba(54, 70, 99, 0.4)',
		borderWidth: 0,
		borderRadius: 50,
		width: 120,
		height: 35,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 3,
		color: '#42454F',
	},
});

export default SensitiveMedia;
