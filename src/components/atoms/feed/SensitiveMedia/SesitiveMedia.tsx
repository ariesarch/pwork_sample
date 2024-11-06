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
			<View
				style={{
					transform: [{ scale: scaleValue }],
					marginBottom: scaleValue < 1 ? -12 : 0,
				}}
			>
				<MediaSensitiveDisbaleIcon />
			</View>
			<ThemeText
				style={{ fontSize: scaleValue < 1 ? 8 : 13 }}
				className="font-bold max-w-[200px] text-white"
			>
				This {mediaType === 'photo' ? 'photo' : 'video'} may include sensitive
				content
			</ThemeText>
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
		borderWidth: 1,
		borderRadius: 50,
		width: 90,
		height: 26,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 24,
		color: '#42454F',
	},
});

export default SensitiveMedia;
