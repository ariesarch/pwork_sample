import React from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Image } from 'react-native-svg';

const ChannelLoading = ({ isLocalChannel }: { isLocalChannel?: boolean }) => {
	return (
		<View style={{ flex: 1 }}>
			<SkeletonPlaceholder backgroundColor="#585e62">
				<SkeletonPlaceholder.Item>
					{/* Title  */}
					<SkeletonPlaceholder.Item
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between"
						marginVertical={10}
					>
						<SkeletonPlaceholder.Item
							width={144}
							height={15}
							borderRadius={2}
						/>
						{!isLocalChannel && (
							<SkeletonPlaceholder.Item
								width={60}
								height={15}
								borderRadius={2}
								marginRight={10}
							/>
						)}
					</SkeletonPlaceholder.Item>
					{/* Title  */}

					{/* Card  */}
					<SkeletonPlaceholder.Item flexDirection="row">
						<SkeletonPlaceholder.Item
							width={144}
							height={144}
							borderRadius={4}
							marginRight={11}
							overflow="hidden"
						/>
						<SkeletonPlaceholder.Item
							width={144}
							height={144}
							borderRadius={4}
							marginRight={11}
							overflow="hidden"
						/>
						<SkeletonPlaceholder.Item
							width={144}
							height={144}
							borderRadius={4}
							overflow="hidden"
						/>
					</SkeletonPlaceholder.Item>
					{/* Card  */}
				</SkeletonPlaceholder.Item>
			</SkeletonPlaceholder>
		</View>
	);
};

export default ChannelLoading;
