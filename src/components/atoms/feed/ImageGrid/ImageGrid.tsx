import { cn } from '@/util/helper/twutil';
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface ImageGridProps {
	media_attachments: Pathchwork.Attachment[];
	renderImage: (
		attachment: Pathchwork.Attachment,
		style: StyleProp<ViewStyle>,
		index: number,
	) => JSX.Element | undefined;
	numColumns: number;
}

const ImageGrid: React.FC<ImageGridProps> = ({
	media_attachments,
	renderImage,
	numColumns,
}) => {
	const isTwoColumns = numColumns === 2;

	return (
		<View style={styles.container}>
			{media_attachments.map((attachment, index) => {
				let style: any = { height: 150 };

				if (isTwoColumns) {
					style =
						index % 2 === 0
							? [styles.leftRoundRadius, style, { width: '100%' }]
							: [
									styles.rightRoundRadius,
									{ ...style, marginLeft: 2, width: '100%' },
							  ];
				} else {
					style = { ...style, borderRadius: 10, width: '100%' };
				}

				return (
					<View
						key={index}
						style={
							index % 2 === 0 ? styles.leftContainer : styles.rightContainer
						}
					>
						{renderImage(attachment, style, index)}
					</View>
				);
			})}
		</View>
	);
};

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
	leftRoundRadius: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	rightRoundRadius: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	topRightRadius: {
		borderTopRightRadius: 10,
	},
});

export default ImageGrid;
