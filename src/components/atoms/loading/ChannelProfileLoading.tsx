import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ChannelLoading from './ChannelLoading';
import ChannleProfilePostsLoading from './ChannelProfilePostsLoading';
import TimelineLoading from './TimelineLoading';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ChannelProfileLoading = () => {
	return (
		<>
			<View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
				<SkeletonPlaceholder backgroundColor="#585e62">
					<SkeletonPlaceholder.Item>
						<SkeletonPlaceholder.Item
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
						>
							<SkeletonPlaceholder.Item
								width={80}
								height={80}
								borderRadius={4}
							/>
							<SkeletonPlaceholder.Item
								width={100}
								height={35}
								borderRadius={30}
								marginTop={20}
								// marginRight={40}
							/>
						</SkeletonPlaceholder.Item>

						<SkeletonPlaceholder.Item>
							<SkeletonPlaceholder.Item
								width={125}
								height={15}
								borderRadius={4}
								marginVertical={8}
							/>
							<SkeletonPlaceholder.Item
								width={230}
								height={15}
								borderRadius={4}
							/>
						</SkeletonPlaceholder.Item>
						<SkeletonPlaceholder.Item marginTop={6}>
							<SkeletonPlaceholder.Item
								width={200}
								height={30}
								borderRadius={10}
							/>
							<SkeletonPlaceholder.Item
								width={'90%'}
								height={40}
								borderRadius={10}
								marginTop={6}
							/>
						</SkeletonPlaceholder.Item>
					</SkeletonPlaceholder.Item>
				</SkeletonPlaceholder>
			</View>

			<ChannleProfilePostsLoading />
			<TimelineLoading style={{ paddingTop: 10 }} />
			{/* <TimelineLoading style={{ paddingTop: 10 }} /> */}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	profileHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 24,
	},
	profileImage: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},
	profileInfo: {
		marginLeft: 16,
		justifyContent: 'center',
	},
	channelName: {
		width: 120,
		height: 20,
		borderRadius: 4,
		marginBottom: 8,
	},
	metadata: {
		width: 180,
		height: 15,
		borderRadius: 4,
		marginBottom: 6,
	},
	followersSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 24,
	},
	followerCircle: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	postsSection: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 16,
	},
	tab: {
		width: SCREEN_WIDTH / 3 - 32,
		height: 40,
		borderRadius: 8,
	},
	post: {
		height: 120,
		borderRadius: 8,
		marginBottom: 16,
	},
});

export default ChannelProfileLoading;
