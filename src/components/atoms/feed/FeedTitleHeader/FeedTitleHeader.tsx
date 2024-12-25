import { ProfileBackIcon } from '@/util/svg/icon.profile';
import { Platform, TouchableOpacity } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedScrollY } from '@/context/sharedScrollContext/sharedScroll.context';
import Animated, {
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
	title: string;
};

export const SolidHeaderDepth = Platform.OS == 'ios' ? 60 : 100;
export const TitleDepth = Platform.OS == 'ios' ? 100 : 140;

const FeedTitleHeader = ({ title }: Props) => {
	const { top } = useSafeAreaInsets();
	const sharedScrollYOffset = useSharedScrollY('Channel');
	const { colorScheme } = useColorScheme();
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

	const animatedHeaderStyle = useAnimatedStyle(() => {
		const alphaValue = interpolate(
			sharedScrollYOffset.value,
			[SolidHeaderDepth, SolidHeaderDepth + 20],
			[0, 1],
		);

		return {
			backgroundColor: getBgColorBasedOnTheme(colorScheme, alphaValue),
		};
	});

	const animatedTitleStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			sharedScrollYOffset.value,
			[TitleDepth, TitleDepth + 20],
			[0, 1],
			'clamp',
		);
		return { opacity };
	});

	const firstBackButtonStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			sharedScrollYOffset.value,
			[TitleDepth - 20, TitleDepth],
			[1, 0],
			'clamp',
		);
		return { opacity };
	});

	const secondBackButtonStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			sharedScrollYOffset.value,
			[TitleDepth, TitleDepth + 20],
			[0, 1],
			'clamp',
		);
		return { opacity };
	});

	return (
		<>
			{/* First Back Button */}
			<Animated.View
				className="absolute left-5 z-10"
				style={[{ top: top + 10 }, firstBackButtonStyle]}
			>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 opacity-50 mr-1"
				>
					<ProfileBackIcon />
				</TouchableOpacity>
			</Animated.View>

			{/* Animated Header */}
			<Animated.View
				pointerEvents="none"
				className={'flex-row items-center absolute px-2 z-40 py-2'}
				style={[{ paddingTop: top + 10 }, animatedHeaderStyle]}
			>
				{/* Second Back Button */}
				<Animated.View style={secondBackButtonStyle}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 opacity-50 mr-1"
					>
						<ProfileBackIcon />
					</TouchableOpacity>
				</Animated.View>

				<Animated.View
					className="flex-1 items-center justify-center"
					style={animatedTitleStyle}
				>
					<ThemeText className="font-SourceSans3_Bold" size={'md_16'}>
						{title}
					</ThemeText>
				</Animated.View>
			</Animated.View>
		</>
	);
};

const getBgColorBasedOnTheme = (
	colorScheme: 'light' | 'dark',
	alphaValue: number,
) => {
	'worklet';
	return colorScheme == 'dark'
		? `rgba(46, 54, 59, ${alphaValue})`
		: `rgba(255, 255, 255, ${alphaValue})`;
};

export default FeedTitleHeader;
