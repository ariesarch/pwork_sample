import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PeopleFollowingLoading = () => {
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
						<SkeletonPlaceholder.Item
							width={60}
							height={15}
							borderRadius={2}
							marginRight={10}
						/>
					</SkeletonPlaceholder.Item>
					{/* Title  */}

					{/* Card  */}
					<SkeletonPlaceholder.Item flexDirection="row" marginVertical={8}>
						<View>
							<SkeletonPlaceholder.Item
								width={100}
								height={100}
								borderRadius={100}
								marginRight={11}
							/>
							<SkeletonPlaceholder.Item marginTop={8} marginLeft={12} width={80} height={10} />
						</View>
						<View>
							<SkeletonPlaceholder.Item
								width={100}
								height={100}
								borderRadius={100}
								marginRight={11}
							/>
							<SkeletonPlaceholder.Item marginTop={8} marginLeft={12} width={80} height={10} />
						</View>
						<View>
							<SkeletonPlaceholder.Item
								width={100}
								height={100}
								borderRadius={100}
								marginRight={11}
							/>
							<SkeletonPlaceholder.Item marginTop={8} marginLeft={12} width={80} height={10} />
						</View>
						<View>
							<SkeletonPlaceholder.Item
								width={100}
								height={100}
								borderRadius={100}
								marginRight={11}
							/>
							<SkeletonPlaceholder.Item marginTop={8} marginLeft={12} width={80} height={10} />
						</View>
					</SkeletonPlaceholder.Item>
					{/* Card  */}
				</SkeletonPlaceholder.Item>
			</SkeletonPlaceholder>
		</View>
	);
};

export default PeopleFollowingLoading;
