import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ChannelBannerLoading = () => {
	return (
		<SkeletonPlaceholder
			backgroundColor={'#dedede'}
			highlightColor={'#fff'}
			speed={4000}
		>
			<SkeletonPlaceholder.Item>
				<SkeletonPlaceholder.Item width={'100%'} height={170} />
			</SkeletonPlaceholder.Item>
		</SkeletonPlaceholder>
	);
};

export default ChannelBannerLoading;
