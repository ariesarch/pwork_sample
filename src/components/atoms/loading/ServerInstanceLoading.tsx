import customColor from '@/util/constant/color';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const ServerInstanceLoading = () => {
	return (
		<View>
			<SkeletonPlaceholder
				backgroundColor={customColor['skeleton-bg']}
				speed={1200}
				highlightColor={customColor['skeleton-highlight']}
			>
				<>
					<SkeletonPlaceholder.Item
						width={'100%'}
						height={240}
						borderTopLeftRadius={6}
						borderTopRightRadius={6}
						marginRight={11}
						marginBottom={20}
						overflow="hidden"
					/>
					<SkeletonPlaceholder.Item
						width={150}
						height={10}
						borderRadius={5}
						marginLeft={11}
						marginBottom={5}
						overflow="hidden"
					/>
					<SkeletonPlaceholder.Item
						width={200}
						height={10}
						borderRadius={5}
						marginLeft={11}
						marginBottom={5}
						overflow="hidden"
					/>
					<SkeletonPlaceholder.Item
						width={180}
						height={10}
						borderRadius={5}
						marginLeft={11}
						marginBottom={5}
						overflow="hidden"
					/>
					<SkeletonPlaceholder.Item
						width={120}
						height={10}
						borderRadius={5}
						marginLeft={11}
						marginBottom={20}
						overflow="hidden"
					/>
				</>
			</SkeletonPlaceholder>
		</View>
	);
};
