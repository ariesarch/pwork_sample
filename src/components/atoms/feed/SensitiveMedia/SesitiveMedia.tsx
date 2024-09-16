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
			<MediaSensitiveDisbaleIcon />
			<ThemeText
				style={{
					maxWidth: 200,
					textAlign: 'center',
				}}
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
				children={
					<View style={[styles.forceViewSensitiveButton]}>
						<ThemeText className="font-bold text-white">View anyway</ThemeText>
					</View>
				}
			/>
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
		gap: 8,
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
