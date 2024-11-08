import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface FourImageGridProps {
	media_attachments: Pathchwork.Attachment[];
	renderImage: (
		attachment: Pathchwork.Attachment,
		style: StyleProp<ViewStyle>,
		index: number,
	) => JSX.Element | undefined;
}

const FourImageGrid: React.FC<FourImageGridProps> = ({
	media_attachments,
	renderImage,
}) => (
	<View style={styles.container}>
		<View style={styles.leftContainer}>
			{renderImage(
				media_attachments[0],
				[styles.topLeftRadius, { height: 73, marginBottom: 1, width: '100%' }],
				0,
			)}
			{renderImage(
				media_attachments[1],
				[styles.bottomLeftRadius, { height: 73, marginTop: 1, width: '100%' }],
				1,
			)}
		</View>
		<View style={styles.rightContainer}>
			{renderImage(
				media_attachments[2],
				[styles.topRightRadius, { height: 73, marginBottom: 1, width: '100%' }],
				2,
			)}
			{renderImage(
				media_attachments[3],
				[styles.bottomRightRadius, { height: 73, marginTop: 1, width: '100%' }],
				3,
			)}
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 10,
		marginTop: 10,
	},
	leftContainer: {
		flex: 1,
		marginRight: 2,
	},
	rightContainer: {
		flex: 1,
		marginLeft: 2,
	},
	topLeftRadius: {
		borderTopLeftRadius: 10,
	},
	bottomLeftRadius: {
		borderBottomLeftRadius: 10,
	},
	topRightRadius: {
		borderTopRightRadius: 10,
	},
	bottomRightRadius: {
		borderBottomRightRadius: 10,
	},
});

export default FourImageGrid;
