import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import customColor from '@/util/constant/color';

const NotificationLoading = () => {
	return (
		<View
			style={{
				paddingBottom: 15,
				alignItems: 'center',
			}}
		>
			<SkeletonPlaceholder
				backgroundColor={customColor['skeleton-bg']}
				highlightColor={customColor['skeleton-highlight']}
				speed={1000}
			>
				<SkeletonPlaceholder.Item>
					<SkeletonPlaceholder.Item flexDirection="row" paddingTop={20}>
						<SkeletonPlaceholder.Item
							marginTop={8}
							width={30}
							height={30}
							borderRadius={10}
						/>
						<SkeletonPlaceholder.Item marginLeft={20}>
							<SkeletonPlaceholder.Item
								flexDirection="row"
								alignItems="center"
								justifyContent="space-between"
							>
								<SkeletonPlaceholder.Item
									width={42}
									height={42}
									borderRadius={42}
								/>
								<SkeletonPlaceholder.Item
									width={100}
									height={15}
									borderRadius={3}
								/>
							</SkeletonPlaceholder.Item>

							<SkeletonPlaceholder.Item>
								<SkeletonPlaceholder.Item
									width={300}
									height={20}
									borderRadius={10}
									marginTop={10}
								/>
							</SkeletonPlaceholder.Item>
							<SkeletonPlaceholder.Item>
								<SkeletonPlaceholder.Item
									width={300}
									height={130}
									borderRadius={10}
									marginTop={10}
								/>
							</SkeletonPlaceholder.Item>
						</SkeletonPlaceholder.Item>
					</SkeletonPlaceholder.Item>
					<SkeletonPlaceholder.Item flexDirection="row" paddingTop={20}>
						<SkeletonPlaceholder.Item
							marginTop={8}
							width={30}
							height={30}
							borderRadius={10}
						/>
						<SkeletonPlaceholder.Item marginLeft={20}>
							<SkeletonPlaceholder.Item
								flexDirection="row"
								alignItems="center"
								justifyContent="space-between"
							>
								<SkeletonPlaceholder.Item
									width={42}
									height={42}
									borderRadius={42}
								/>
								<SkeletonPlaceholder.Item
									width={100}
									height={15}
									borderRadius={3}
								/>
							</SkeletonPlaceholder.Item>
							<SkeletonPlaceholder.Item>
								<SkeletonPlaceholder.Item
									width={300}
									height={20}
									borderRadius={10}
									marginTop={10}
								/>
							</SkeletonPlaceholder.Item>
							<SkeletonPlaceholder.Item>
								<SkeletonPlaceholder.Item
									width={300}
									height={80}
									borderRadius={10}
									marginTop={10}
								/>
							</SkeletonPlaceholder.Item>
						</SkeletonPlaceholder.Item>
					</SkeletonPlaceholder.Item>
					<SkeletonPlaceholder.Item flexDirection="row" paddingTop={20}>
						<SkeletonPlaceholder.Item
							marginTop={8}
							width={30}
							height={30}
							borderRadius={10}
						/>
						<SkeletonPlaceholder.Item marginLeft={20}>
							<SkeletonPlaceholder.Item
								flexDirection="row"
								alignItems="center"
								justifyContent="space-between"
							>
								<SkeletonPlaceholder.Item
									width={42}
									height={42}
									borderRadius={42}
								/>
								<SkeletonPlaceholder.Item
									width={100}
									height={15}
									borderRadius={3}
								/>
							</SkeletonPlaceholder.Item>
							<SkeletonPlaceholder.Item>
								<SkeletonPlaceholder.Item
									width={300}
									height={300}
									borderRadius={10}
									marginTop={10}
								/>
							</SkeletonPlaceholder.Item>
						</SkeletonPlaceholder.Item>
					</SkeletonPlaceholder.Item>
				</SkeletonPlaceholder.Item>
			</SkeletonPlaceholder>
		</View>
	);
};

export default NotificationLoading;
