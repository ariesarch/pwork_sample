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
				[{ height: 114, borderRadius: 10 }],
				0,
			)}
			{renderImage(
				media_attachments[1],
				[{ height: 114, marginTop: 1, borderRadius: 10 }],
				1,
			)}
		</View>
		<View style={styles.rightContainer}>
			{renderImage(
				media_attachments[2],
				[{ height: 114, borderRadius: 10 }],
				2,
			)}
			{renderImage(
				media_attachments[3],
				[{ height: 114, marginTop: 1, borderRadius: 10 }],
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
	},
	leftContainer: {
		flex: 1,
	},
	rightContainer: {
		flex: 1,
		marginLeft: 5,
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
