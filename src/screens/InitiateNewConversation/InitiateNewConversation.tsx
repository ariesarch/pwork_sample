import { queryClient } from '@/App';
import ImageCard from '@/components/atoms/compose/ImageCard/ImageCard';
import ConversationsHeader from '@/components/molecules/conversations/Header/Header';
import InitialMessageActionsBar from '@/components/molecules/conversations/InitialMessageActionBar/InitialMessageActionBar';
import MessageActionsBar from '@/components/molecules/conversations/MessageActionsBar/MessageActionsBar';
import MessageItem from '@/components/molecules/conversations/MessageItem/MessageItem';
import ProfileInfo from '@/components/molecules/conversations/ProfileInfo/ProfileInfo';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ComposeStatusProvider } from '@/context/composeStatusContext/composeStatus.context';
import {
	BottomBarHeight,
	useGradualAnimation,
} from '@/hooks/custom/useGradualAnimation';
import { ConversationsStackScreenProps } from '@/types/navigation';
import { FlashList } from '@shopify/flash-list';
import { stat } from 'fs';
import { useCallback, useEffect, useState } from 'react';
import { Dimensions, RefreshControl, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
const InitiateNewConversation = ({
	navigation,
	route,
}: ConversationsStackScreenProps<'InitiateNewConversation'>) => {
	const { account } = route.params;
	const { height, progress } = useGradualAnimation();
	const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
	const [totalMsgList, setTotalMsgList] = useState<Pathchwork.Status[]>();

	useEffect(() => {
		return () => {
			queryClient.invalidateQueries({ queryKey: ['conversations'] });
			queryClient.invalidateQueries({
				queryKey: ['user-conversation', { id: account.id }],
			});
		};
	}, []);

	const imageCardWrapperStyle = useAnimatedStyle(() => ({
		opacity: progress.value,
		height: progress.value < 0.5 ? 0 : 'auto',
	}));

	const virtualKeyboardContainerStyle = useAnimatedStyle(() => {
		return {
			height:
				height.value > BottomBarHeight ? height.value - BottomBarHeight : 0,
		};
	});

	const handleSetCurrentMessageId = useCallback((id: string | null) => {
		setCurrentMessageId(id);
	}, []);

	return (
		<SafeScreen>
			<ComposeStatusProvider type="chat">
				<View className="flex-1">
					<ConversationsHeader
						onPressBackButton={() => {
							navigation.goBack();
						}}
						chatParticipant={account}
					/>
					{totalMsgList ? (
						<View style={{ flex: 1 }}>
							<FlashList
								ListFooterComponent={<ProfileInfo userInfo={account} />}
								inverted
								data={totalMsgList.reverse()}
								renderItem={({ item, index }) => {
									const previousMsg =
										index > 0 ? totalMsgList[index - 1] : undefined;
									return (
										<MessageItem
											message={item}
											previousMsg={previousMsg}
											currentMessageId={currentMessageId}
											handlePress={handleSetCurrentMessageId}
										/>
									);
								}}
								showsVerticalScrollIndicator={false}
								estimatedItemSize={100}
								estimatedListSize={{
									height: Dimensions.get('screen').height,
									width: Dimensions.get('screen').width,
								}}
							/>
						</View>
					) : (
						<View className="flex-1 pt-3">
							<ProfileInfo userInfo={account} />
						</View>
					)}
					<Animated.View
						style={imageCardWrapperStyle}
						className="bg-patchwork-grey-70"
					>
						<ImageCard composeType="chat" />
					</Animated.View>
					<InitialMessageActionsBar
						account={account}
						lastMsg={
							totalMsgList ? totalMsgList[totalMsgList.length - 1] : undefined
						}
						changeTotalMsgList={(status: Pathchwork.Status) => {
							setTotalMsgList(prev => (prev ? [...prev, status] : [status]));
						}}
					/>
					<Animated.View style={virtualKeyboardContainerStyle} />
				</View>
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default InitiateNewConversation;
