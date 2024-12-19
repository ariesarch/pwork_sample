import customColor from '@/util/constant/color';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CollectionChannelLoading = () => (
	<View style={{ flex: 1 }}>
		<SkeletonPlaceholder
			backgroundColor={customColor['skeleton-bg']}
			highlightColor={customColor['skeleton-highlight']}
			speed={1000}
		>
			<View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 15 }}>
				{[...Array(8)].map((_, index) => (
					<View
						key={index}
						style={{
							width: '45%',
							margin: 8,
							height: 150,
							borderRadius: 8,
						}}
					>
						<SkeletonPlaceholder.Item
							width="100%"
							height={150}
							borderRadius={8}
						/>
					</View>
				))}
			</View>
		</SkeletonPlaceholder>
	</View>
);

export default CollectionChannelLoading;
