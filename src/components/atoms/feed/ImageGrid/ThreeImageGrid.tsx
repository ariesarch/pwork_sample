import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

interface ThreeImageGridProps {
	media_attachments: Pathchwork.Attachment[];
	renderImage: (
		attachment: Pathchwork.Attachment,
		style: any,
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
				{ height: 150, marginRight: 2.5, width: '100%' },
			],
			0,
		)}
		<View style={styles.rightContainer}>
			{renderImage(
				media_attachments[1],
				[
					styles.topRightRadius,
					{ height: 73, marginBottom: 2.5, width: '100%' },
				],
				1,
			)}
			{renderImage(
				media_attachments[2],
				[
					styles.bottomRightRadius,
					{ height: 73, marginTop: 2.5, width: '100%' },
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
		marginLeft: 2.5,
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

export default memo(ThreeImageGrid);
