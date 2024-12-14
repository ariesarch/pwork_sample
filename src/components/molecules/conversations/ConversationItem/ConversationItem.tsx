import React from 'react';
import { InteractionManager, View, Pressable } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import FastImage from 'react-native-fast-image';
import { DeleteIcon } from '@/util/svg/icon.common';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import customColor from '@/util/constant/color';
import { getDurationFromNow } from '@/util/helper/getDurationFromNow';
import { extractMessage } from '@/util/helper/extractMessage';
import { cleanText } from '@/util/helper/cleanText';
import Reanimated, {
	SharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function RightSwipeDeleteItem(
	prog: SharedValue<number>,
	drag: SharedValue<number>,
) {
	const styleAnimation = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: drag.value + 80 }],
		};
	});

	return (
		<Reanimated.View
			style={[
				styleAnimation,
				{
					backgroundColor: customColor['patchwork-red-50'],
					alignItems: 'center',
					justifyContent: 'center',
					width: '20%',
				},
			]}
		>
			<DeleteIcon fill="white" />
		</Reanimated.View>
	);
}

// ConversationItem Component
type Props = {
	item: Pathchwork.Conversations;
	onPress: () => void;
	onSwipeOpen: (itemId: string) => void;
	onSwipeClose: (itemId: string) => void;
	swipeableRefs: any;
	userInfoID: string;
};

export const ConversationItem = ({
	item,
	onPress,
	userInfoID,
	onSwipeOpen,
	onSwipeClose,
	swipeableRefs,
}: Props) => {
	return (
		<GestureHandlerRootView>
			<Swipeable
				// containerStyle={{ alignItems: 'center' }}
				friction={2}
				enableTrackpadTwoFingerGesture
				rightThreshold={40}
				ref={ref => {
					if (ref) swipeableRefs.current[item.id] = ref;
				}}
				renderRightActions={RightSwipeDeleteItem}
				onSwipeableOpen={() =>
					InteractionManager.runAfterInteractions(() => onSwipeOpen(item.id))
				}
				onSwipeableClose={() =>
					InteractionManager.runAfterInteractions(() => onSwipeClose(item.id))
				}
			>
				<Pressable
					onPress={onPress}
					className="flex-row items-center rounded-2xl p-3 mr-2 my-1"
				>
					<FastImage
						className="w-14 h-14 rounded-full mr-3"
						source={{ uri: item.accounts[0].avatar }}
						resizeMode={FastImage.resizeMode.contain}
					/>
					<View className="flex-1 mr-6">
						<View className="flex-row items-center">
							<ThemeText variant="textOrange">
								{item.accounts[0].display_name}
							</ThemeText>
							<ThemeText className="text-patchwork-grey-400 ml-3">
								{item.last_status
									? getDurationFromNow(item.last_status.created_at)
									: ''}
							</ThemeText>
						</View>
						<ThemeText size="fs_13" className="text-patchwork-grey-400 my-0.5">
							@{item.accounts[0].acct}
						</ThemeText>
						<View className="flex-row items-center">
							<ThemeText>
								{item.last_status?.account?.id === userInfoID ? 'You: ' : ''}
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
			</Swipeable>
		</GestureHandlerRootView>
	);
};
