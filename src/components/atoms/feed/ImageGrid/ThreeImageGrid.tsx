import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface ThreeImageGridProps {
	media_attachments: Pathchwork.Attachment[];
	renderImage: (
		attachment: Pathchwork.Attachment,
		style: StyleProp<ViewStyle>,
		index: number,
	) => JSX.Element | undefined;
}

const ThreeImageGrid: React.FC<ThreeImageGridProps> = ({
	media_attachments,
	renderImage,
}) => (
	<View style={styles.container}>
		{renderImage(
			media_attachments[0],
			[
				styles.leftRoundRadius,
				{
					height: 150,
					width: '100%',
				},
			],
			0,
		)}
		<View style={styles.rightContainer}>
			{renderImage(
				media_attachments[1],
				[
					styles.topRightRadius,
					{ height: 72, marginBottom: 1.2, width: '100%' },
				],
				1,
			)}
			{renderImage(
				media_attachments[2],
				[
					styles.bottomRightRadius,
					{ height: 72, marginTop: 1.2, width: '100%' },
				],
				2,
			)}
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 150,
		width: '100%',
		flexDirection: 'row',
		borderRadius: 10,
		marginTop: 10,
	},
	rightContainer: {
		flex: 1,
		marginLeft: 3.5,
	},
	leftRoundRadius: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	topRightRadius: {
		borderTopRightRadius: 10,
	},
	bottomRightRadius: {
		borderBottomRightRadius: 10,
	},
});

export default ThreeImageGrid;
