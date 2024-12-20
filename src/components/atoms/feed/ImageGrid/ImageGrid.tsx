import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

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
		<View className="flex-1 flex-row mt-2">
			{media_attachments.map((attachment, index) => {
				let style: any = { height: 232 };

				if (isTwoColumns) {
					style =
						index % 2 === 0
							? {
									width: '100%',
									borderRadius: 10,
									...style,
							  }
							: {
									marginLeft: 2,
									width: '100%',
									borderRadius: 10,
									...style,
							  };
				} else {
					style = { borderRadius: 10, width: '100%', ...style };
				}

				return (
					<View key={index} className="flex-1">
						{renderImage(attachment, style, index)}
					</View>
				);
			})}
		</View>
	);
};

export default ImageGrid;
