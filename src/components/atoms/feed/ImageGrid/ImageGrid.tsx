import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

interface ImageGridProps {
	media_attachments: Pathchwork.Attachment[];
	renderImage: (
		attachment: Pathchwork.Attachment,
		style: any,
		index: number,
	) => JSX.Element | undefined;
	numColumns: number;
	imageHeight: number;
}

const ImageGrid: React.FC<ImageGridProps> = ({
	media_attachments,
	renderImage,
	numColumns,
	imageHeight,
}) => {
	const isTwoColumns = numColumns === 2;

	return (
		<View style={styles.container}>
			{media_attachments.map((attachment, index) => {
				let style: any = { height: imageHeight };

				if (isTwoColumns) {
					style =
						index % 2 === 0
							? [styles.leftRoundRadius, style]
							: [
									styles.rightRoundRadius,
									{ ...style, marginLeft: 2.5, width: '100%' },
							  ];
				} else {
					style =
						index === 2
							? [styles.topRightRadius, style]
							: [{ ...style, marginTop: 2.5, borderRadius: 10, width: '100%' }];
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
		marginRight: 2.5,
	},
	rightContainer: {
		flex: 1,
		marginLeft: 2.5,
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

export default memo(ImageGrid);
