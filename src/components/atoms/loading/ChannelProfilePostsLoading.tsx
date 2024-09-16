import React from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Image } from 'react-native-svg';

const ChannleProfilePostsLoading = () => {
	return (
		<View
			style={{
				// flex: 1,
				borderTopWidth: 1,
				borderTopColor: '#585e62',
				borderBottomWidth: 1,
				borderBottomColor: '#585e62',
				paddingHorizontal: 20,
        paddingBottom: 10,
			}}
		>
			<SkeletonPlaceholder backgroundColor="#585e62">
				<SkeletonPlaceholder.Item>
					{/* Tab Bar  */}
					<SkeletonPlaceholder.Item
						flexDirection="row"
						alignItems="center"
						justifyContent="space-around"
						marginVertical={10}
					>
						<SkeletonPlaceholder.Item
							width={150}
							height={40}
							borderRadius={2}
						/>
						<SkeletonPlaceholder.Item
							width={150}
							height={40}
							borderRadius={2}
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
								width={60}
								height={60}
								borderRadius={40}
							/>
							<SkeletonPlaceholder.Item
								width={40}
								height={10}
								borderRadius={40}
								marginTop={5}
							/>
						</View>
						<View style={{ alignItems: 'center' }}>
							<SkeletonPlaceholder.Item
								width={60}
								height={60}
								borderRadius={40}
							/>
							<SkeletonPlaceholder.Item
								width={60}
								height={10}
								borderRadius={40}
								marginTop={5}
							/>
						</View>
						<View style={{ alignItems: 'center' }}>
							<SkeletonPlaceholder.Item
								width={60}
								height={60}
								borderRadius={40}
							/>
							<SkeletonPlaceholder.Item
								width={60}
								height={10}
								borderRadius={40}
								marginTop={5}
							/>
						</View>
						<View style={{ alignItems: 'center' }}>
							<SkeletonPlaceholder.Item
								width={60}
								height={60}
								borderRadius={40}
							/>
							<SkeletonPlaceholder.Item
								width={60}
								height={10}
								borderRadius={40}
								marginTop={5}
							/>
						</View>
            <View style={{alignItems: 'center'}}>
							<SkeletonPlaceholder.Item
								width={60}
								height={60}
								borderRadius={40}
							/>
              <SkeletonPlaceholder.Item
								width={60}
								height={10}
								borderRadius={40}
                marginTop={5}
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
