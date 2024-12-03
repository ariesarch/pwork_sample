import customColor from '@/util/constant/color';
import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ConversationsListLoading = () => {
	return (
		<View className="mb-1 mx-3">
			<SkeletonPlaceholder
				backgroundColor={customColor['skeleton-bg']}
				highlightColor={customColor['skeleton-highlight']}
				speed={1000}
			>
				<SkeletonPlaceholder.Item
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 15,
					}}
				>
					<SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
					<SkeletonPlaceholder.Item style={{ marginLeft: 10 }}>
						<View
							style={{
								width: 150,
								height: 12,
								borderRadius: 6,
							}}
						/>
						<View
							style={{
								marginTop: 10,
								width: 220,
								height: 12,
								borderRadius: 6,
							}}
						/>
					</SkeletonPlaceholder.Item>
				</SkeletonPlaceholder.Item>
			</SkeletonPlaceholder>
		</View>
	);
};

export default ConversationsListLoading;
