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
		<View className="flex-1 flex-row rounded-lg mt-2">
			{media_attachments.map((attachment, index) => {
				let style: any = { height: 150 };

				if (isTwoColumns) {
					style =
						index % 2 === 0
							? {
									width: '100%',
									borderTopLeftRadius: 10,
									borderBottomLeftRadius: 10,
									...style,
							  }
							: {
									marginLeft: 2,
									width: '100%',
									borderTopRightRadius: 10,
									borderBottomRightRadius: 10,
									...style,
							  };
				} else {
					style = { borderRadius: 10, width: '100%', ...style };
				}

				return (
					<View
						key={index}
						className={`${index % 2 === 0 ? 'flex-1 mr-0.5' : 'flex-1 ml-0.5'}`}
					>
						{renderImage(attachment, style, index)}
					</View>
				);
			})}
		</View>
	);
};

export default ImageGrid;
