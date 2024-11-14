import customColor from '@/util/constant/color';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ChannelBannerLoading = () => {
	return (
		<SkeletonPlaceholder
			backgroundColor={customColor['skeleton-highlight']}
			speed={1000}
		>
			<SkeletonPlaceholder.Item>
				<SkeletonPlaceholder.Item width={'100%'} height={170} />
			</SkeletonPlaceholder.Item>
		</SkeletonPlaceholder>
	);
};

export default ChannelBannerLoading;
