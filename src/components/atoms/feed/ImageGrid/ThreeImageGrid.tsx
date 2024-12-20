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
				{
					height: 232,
					width: '100%',
					borderRadius: 10,
				},
			],
			0,
		)}
		<View style={styles.rightContainer}>
			{renderImage(
				media_attachments[1],
				[{ height: 109, width: '100%', borderRadius: 10 }],
				1,
			)}
			{renderImage(
				media_attachments[2],
				[{ height: 109, marginTop: 1, width: '100%', borderRadius: 10 }],
				2,
			)}
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		borderRadius: 10,
		marginTop: 10,
	},
	rightContainer: {
		flex: 1,
		marginLeft: 3,
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
