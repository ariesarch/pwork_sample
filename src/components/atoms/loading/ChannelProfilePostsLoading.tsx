import customColor from '@/util/constant/color';
import React from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Image } from 'react-native-svg';

const ChannleProfilePostsLoading = () => {
	return (
		<View
			style={{
				paddingHorizontal: 20,
				paddingTop: 15,
				paddingBottom: 10,
			}}
		>
			<SkeletonPlaceholder
				backgroundColor={customColor['skeleton-bg']}
				highlightColor={customColor['skeleton-highlight']}
				speed={1000}
			>
				<SkeletonPlaceholder.Item>
					{/* Horizontal Menu  */}
					<SkeletonPlaceholder.Item
						flexDirection="row"
						justifyContent="space-around"
					>
						<View style={{ alignItems: 'center' }}>
							<SkeletonPlaceholder.Item
								width={50}
								height={50}
								borderRadius={50}
							/>
							<SkeletonPlaceholder.Item
								width={30}
								height={10}
								borderRadius={50}
								marginTop={8}
							/>
						</View>
						<View style={{ alignItems: 'center' }}>
							<SkeletonPlaceholder.Item
								width={50}
								height={50}
								borderRadius={50}
							/>
							<SkeletonPlaceholder.Item
								width={35}
								height={10}
								borderRadius={50}
								marginTop={8}
							/>
						</View>
						<View style={{ alignItems: 'center' }}>
							<SkeletonPlaceholder.Item
								width={50}
								height={50}
								borderRadius={50}
							/>
							<SkeletonPlaceholder.Item
								width={35}
								height={10}
								borderRadius={50}
								marginTop={8}
							/>
						</View>
						<View style={{ alignItems: 'center' }}>
							<SkeletonPlaceholder.Item
								width={50}
								height={50}
								borderRadius={50}
							/>
							<SkeletonPlaceholder.Item
								width={35}
								height={10}
								borderRadius={50}
								marginTop={8}
							/>
						</View>
						<View style={{ alignItems: 'center' }}>
							<SkeletonPlaceholder.Item
								width={50}
								height={50}
								borderRadius={50}
							/>
							<SkeletonPlaceholder.Item
								width={35}
								height={10}
								borderRadius={50}
								marginTop={8}
							/>
						</View>
					</SkeletonPlaceholder.Item>
					{/* Horizontal Menu  */}
				</SkeletonPlaceholder.Item>
			</SkeletonPlaceholder>
		</View>
	);
};

export default ChannleProfilePostsLoading;
