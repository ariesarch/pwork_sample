import React from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Image } from 'react-native-svg';

const backgroundColor = "#f0f0f0";
const highlightColor = "#bfbfbf";

const ChannleProfilePostsLoading = () => {
	return (
		<View
			style={{
				borderTopWidth: 1,
				borderTopColor: '#585e62',
				borderBottomWidth: 1,
				borderBottomColor: '#585e62',
				paddingHorizontal: 20,
				paddingVertical: 10,
			}}
		>
			<SkeletonPlaceholder
				backgroundColor={backgroundColor}
				highlightColor={highlightColor}
				speed={1000}
			>
				<SkeletonPlaceholder.Item>
					{/* Tab Bar  */}
					<SkeletonPlaceholder.Item
						flexDirection="row"
						alignItems="center"
						justifyContent="space-around"
						marginBottom={10}
					>
						<SkeletonPlaceholder.Item
							width={"40%"}
							height={35}
							borderRadius={3}
						/>
						<SkeletonPlaceholder.Item
							width={"40%"}
							height={35}
							borderRadius={3}
						/>
					</SkeletonPlaceholder.Item>
					{/* Tab Bar  */}

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
