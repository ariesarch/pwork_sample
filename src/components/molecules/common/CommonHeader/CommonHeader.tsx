import {
	View,
	useWindowDimensions,
	StyleSheet,
	TouchableOpacity,
	ImageSourcePropType,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { ScrollHeaderProps } from '@codeherence/react-native-header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from 'react-native-reanimated';
import { FadingView, Header } from '@codeherence/react-native-header';
import { ProfileBackIcon } from '@/util/svg/icon.profile';
import AccountName from '@/components/atoms/profile/AccountName';
import { scale } from '@/util/helper/helper';
import Banner from '@/components/atoms/common/Banner/Banner';
import Avatar from '@/components/atoms/profile/Avatar';
import CommonHeaderRight from '../CommonHeaderRight/CommonHeaderRight';

type CommonHeaderProps = {
	bannerSrc?: any;
	imageSrc?: any;
	avatarStyle?: string | undefined;
	channelName?: string;
	blurhash?: string;
};
const CommonHeader = ({
	showNavBar,
	scrollY,
	bannerSrc,
	imageSrc,
	avatarStyle,
	channelName,
	blurhash
}: ScrollHeaderProps & CommonHeaderProps) => {
	const navigation = useNavigation();
	const { left, right } = useSafeAreaInsets();
	const { height } = useWindowDimensions();
	const bannerHeight = useSharedValue(52);

	const blurStyle = useAnimatedStyle(() => {
		const blurOpacity = interpolate(
			Math.abs(scrollY.value),
			[0, 40],
			[0, 1],
			Extrapolation.CLAMP,
		);

		return { opacity: blurOpacity };
	});

	const profileImageScale = useDerivedValue(() => {
		return interpolate(scrollY.value, [0, 64], [1, 0.5], Extrapolation.CLAMP);
	});

	const bannerTranslationStyle = useAnimatedStyle(() => {
		const bannerTranslation = interpolate(
			scrollY.value,
			[0, 45],
			[0, -45],
			Extrapolation.CLAMP,
		);

		return { transform: [{ translateY: bannerTranslation }] };
	});

	const profileContainerTranslationStyle = useAnimatedStyle(() => {
		const translateY = -scrollY.value + 22 / 2;

		return { transform: [{ translateY }] };
	});

	const rootProfileRowZIndexStyle = useAnimatedStyle(() => {
		return { zIndex: profileImageScale.value <= 0.5 ? -1 : 1 };
	});

	const profileImageScaleStyle = useAnimatedStyle(() => {
		const profileImageTranslationY = interpolate(
			profileImageScale.value,
			[1, 0.5],
			[0, 64 / 2],
			Extrapolation.CLAMP,
		);

		return {
			transform: [
				{ scale: profileImageScale.value },
				{ translateY: profileImageTranslationY },
			],
		};
	});

	const animatedScaleStyle = useAnimatedStyle(() => {
		const bannerHeightRatio = height / bannerHeight.value;

		const scaleY = interpolate(
			scrollY.value,
			[0, -(height + bannerHeight.value)],
			[1, bannerHeightRatio],
			Extrapolation.CLAMP,
		);

		return {
			transform: [{ scaleY }, { scaleX: scaleY }],
		};
	}, [height]);

	return (
		<View style={{ position: 'relative', zIndex: 1 }}>
			{/* Banner */}
			<Banner
				source={bannerSrc ?? require('../../../../../assets/images/mock/profile/banner_img.jpeg')}
				blurhash={blurhash}
				{...{
					bannerHeight,
					bannerTranslationStyle,
					animatedScaleStyle,
					blurStyle,
				}}
			/>
			{/* Banner */}

			<Header
				showNavBar={showNavBar}
				headerCenterFadesIn={false}
				headerStyle={{
					backgroundColor: 'transparent',
					paddingBottom: scale(20),
				}}
				noBottomBorder
				headerRight={<CommonHeaderRight />}
				headerLeft={
					<View className="flex-row items-center justify-center">
						<TouchableOpacity
							onPress={() => navigation.canGoBack() && navigation.goBack()}
							className="w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 opacity-50"
						>
							<ProfileBackIcon />
						</TouchableOpacity>
						<FadingView opacity={showNavBar}>
							<AccountName
								accountName={channelName ?? 'Account name'}
								hasRedMark={!channelName}
								className="ml-1"
							/>
						</FadingView>
					</View>
				}
			/>

			<Animated.View style={[rootProfileRowZIndexStyle]}>
				<Animated.View
					style={[
						styles.profileFollowContainer,
						{
							left: Math.max(left, 12),
							right: Math.max(right, 12),
						},
						profileContainerTranslationStyle,
					]}
				>
					<Animated.View style={profileImageScaleStyle}>
						<Avatar
							src={
								imageSrc ??
								require('../../../../../assets/images/mock/profile/profile_img.jpeg')
							}
							className={`${avatarStyle ??
								'rounded-full -top-4 w-20 h-20 border-patchwork-dark-100 border-[2.56px]'
								}`}
						/>
					</Animated.View>
				</Animated.View>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	profileFollowContainer: {
		position: 'absolute',
		left: 12,
		right: 12,
		flexDirection: 'row',
	},
});
export default CommonHeader;
