import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import customColor from '@/util/constant/color';
import { appendInstance } from '@/util/helper/appendInstance';
import { cleanText } from '@/util/helper/cleanText';
import { extractMessage } from '@/util/helper/extractMessage';
import { getDurationFromNow } from '@/util/helper/getDurationFromNow';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
	PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

interface ListItemProps
	extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
	item: Pathchwork.Conversations;
	onDismiss?: (id: string) => void;
	userInfoId: string;
	onPress: (id: string) => void;
}

const LIST_ITEM_HEIGHT = 60;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const ConversationItem: React.FC<ListItemProps> = ({
	item,
	onDismiss,
	simultaneousHandlers,
	onPress,
	userInfoId,
}) => {
	const translateX = useSharedValue(0);
	const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
	const marginVertical = useSharedValue(10);
	const opacity = useSharedValue(1);

	const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
		onActive: event => {
			translateX.value = event.translationX;
		},
		onEnd: () => {
			const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
			if (shouldBeDismissed) {
				translateX.value = withTiming(-SCREEN_WIDTH);
				itemHeight.value = withTiming(0);
				marginVertical.value = withTiming(0);
				opacity.value = withTiming(0, undefined, isFinished => {
					if (isFinished && onDismiss) {
						runOnJS(onDismiss)(item.id);
					}
				});
			} else {
				translateX.value = withTiming(0);
			}
		},
	});

	const rStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: translateX.value,
			},
		],
	}));

	const rIconContainerStyle = useAnimatedStyle(() => {
		const opacity = withTiming(
			translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
		);
		return { opacity };
	});

	const ritemContainerStyle = useAnimatedStyle(() => {
		return {
			height: itemHeight.value,
			marginVertical: marginVertical.value,
			opacity: opacity.value,
			zIndex: 1,
		};
	});

	return (
		<Animated.View style={[styles.container, ritemContainerStyle]}>
			<Animated.View style={[styles.deleteContainer, rIconContainerStyle]}>
				<ThemeText>delete</ThemeText>
			</Animated.View>
			<PanGestureHandler
				waitFor={simultaneousHandlers}
				shouldCancelWhenOutside
				enableTrackpadTwoFingerGesture
				simultaneousHandlers={simultaneousHandlers}
				onGestureEvent={panGesture}
				activeOffsetX={[-10, 10]}
			>
				<Animated.View style={[styles.item, rStyle]}>
					<Pressable
						onPress={() => onPress(item.id)}
						className="flex-row items-center rounded-2xl p-3 mr-2 my-1"
					>
						<FastImage
							className="w-14 h-14 rounded-full mr-3"
							source={{ uri: item.accounts[0].avatar }}
							resizeMode={FastImage.resizeMode.contain}
						/>
						<View className="flex-1 mr-6">
							<View className="flex-row items-center">
								<ThemeText variant={'textOrange'}>
									{item.accounts[0].display_name}
								</ThemeText>
								<ThemeText className="text-patchwork-grey-400 ml-3">
									{item.last_status
										? getDurationFromNow(item.last_status.created_at)
										: ''}
								</ThemeText>
							</View>
							<ThemeText
								size={'fs_13'}
								className="text-patchwork-grey-400 my-0.5"
							>
								{appendInstance(`@${item.accounts[0].acct}`)}
							</ThemeText>
							<View className="flex-row items-center">
								<ThemeText>
									{item.last_status?.account?.id === userInfoId ? 'You: ' : ''}
								</ThemeText>
								<ThemeText
									className={`w-full ${
										item.unread ? 'font-bold' : 'font-normal'
									}`}
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{extractMessage(cleanText(item.last_status?.content))}
								</ThemeText>
							</View>
						</View>
						{item.unread && (
							<View className="w-2 h-2 bg-patchwork-red-50 rounded-full mr-2" />
						)}
					</Pressable>
				</Animated.View>
			</PanGestureHandler>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	item: {
		width: '100%',
		height: LIST_ITEM_HEIGHT,
		justifyContent: 'center',
	},
	deleteContainer: {
		height: LIST_ITEM_HEIGHT,
		width: LIST_ITEM_HEIGHT,
		position: 'absolute',
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: customColor['patchwork-red-50'],
	},
});

export default ConversationItem;
