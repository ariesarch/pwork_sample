import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { ConversationsStackScreenProps } from '@/types/navigation';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { Dimensions, Pressable, View } from 'react-native';
import {
	BottomBarHeight,
	useGradualAnimation,
} from '@/hooks/custom/useGradualAnimation';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import ConversationsHeader from '@/components/molecules/conversations/Header/Header';
import MessageActionsBar from '@/components/molecules/conversations/MessageActionsBar/MessageActionsBar';
import { ComposeStatusProvider } from '@/context/composeStatusContext/composeStatus.context';
import { FlashList } from '@shopify/flash-list';
import { RefreshControl } from 'react-native-gesture-handler';
import customColor from '@/util/constant/color';
import { delay } from 'lodash';
import MessageItem from '@/components/molecules/conversations/MessageItem/MessageItem';
import useGetCurrentConversation from '@/hooks/custom/useGetCurrentConversation';
import { Flow } from 'react-native-animated-spinkit';
import { useMessageListQuery } from '@/hooks/queries/conversations.queries';
import {
	markAsReadInConversationCache,
	removeOldMsgListCacheAndCreateNewOne,
} from '@/util/cache/conversation/conversationCahce';
import ProfileInfo from '@/components/molecules/conversations/ProfileInfo/ProfileInfo';
import ImageCard from '@/components/atoms/compose/ImageCard/ImageCard';
import { useManageAttachmentActions } from '@/store/compose/manageAttachments/manageAttachmentStore';
import { useActiveConversationActions } from '@/store/conversation/activeConversationStore';
import { useMarkAsReadMutation } from '@/hooks/mutations/conversations.mutation';
import { DownIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';

const ConversationDetail = ({
	navigation,
	route,
}: ConversationsStackScreenProps<'ConversationDetail'>) => {
	const { id: initialLastMsgId, isFromNotification } = route.params;
	const { height, progress } = useGradualAnimation();
	const [refresh, setRefresh] = useState(false);
	const currentConversation = useGetCurrentConversation(
		initialLastMsgId,
		isFromNotification,
	);
	const { removeActiveConversation } = useActiveConversationActions();
	const receiver = currentConversation?.accounts[0];
	const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
	const listRef = useRef<FlashList<any>>(null);
	const [showScrollToBottom, setShowScrollToBottom] = useState(false);
	const { colorScheme } = useColorScheme();

	const {
		data: messageList,
		isLoading: isMessageLoading,
		refetch: refetchMessageList,
	} = useMessageListQuery({
		id: initialLastMsgId,
	});

	const { mutate: markConversationAsRead } = useMarkAsReadMutation({
		onSuccess: data => markAsReadInConversationCache(data.id),
	});

	const virtualKeyboardContainerStyle = useAnimatedStyle(() => {
		return {
			height:
				height.value > BottomBarHeight ? height.value - BottomBarHeight : 0,
		};
	});

	const handleRefresh = () => {
		setRefresh(true);
		delay(() => setRefresh(false), 1200);
	};

	useEffect(() => {
		return () => {
			removeOldMsgListCacheAndCreateNewOne(initialLastMsgId);
			removeActiveConversation();
		};
	}, []);

	const totalMsgList = useMemo(() => {
		if (messageList?.ancestors && currentConversation?.last_status) {
			return [
				...messageList?.descendants,
				currentConversation?.last_status,
				...messageList?.ancestors,
			];
		}
		return [];
	}, [messageList, currentConversation]);

	const imageCardWrapperStyle = useAnimatedStyle(() => ({
		opacity: progress.value,
		height: progress.value < 0.5 ? 0 : 'auto',
	}));

	const handleSetCurrentMessageId = useCallback((id: string | null) => {
		setCurrentMessageId(id);
	}, []);

	const handleScrollToBottom = () => {
		listRef.current?.scrollToOffset({ offset: 0, animated: true });
		setShowScrollToBottom(false);
	};

	const handleScroll = useCallback(
		(event: { nativeEvent: { contentOffset: { y: any } } }) => {
			const offsetY = event.nativeEvent.contentOffset.y;
			const showButtonThreshold = 200;

			setShowScrollToBottom(offsetY > showButtonThreshold);
		},
		[],
	);

	return (
		<SafeScreen>
			<ComposeStatusProvider type="chat">
				<View className="flex-1">
					<ConversationsHeader
						onPressBackButton={() => {
							markConversationAsRead({ id: currentConversation?.id! });
							navigation.navigate('ConversationList');
						}}
						chatParticipant={receiver}
					/>
					<View style={{ flex: 1 }}>
						{totalMsgList && !isMessageLoading && receiver ? (
							<FlashList
								ListFooterComponent={<ProfileInfo userInfo={receiver} />}
								ref={listRef}
								inverted
								extraData={currentMessageId}
								data={totalMsgList}
								keyExtractor={item => item.id.toString()}
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
								refreshControl={
									<RefreshControl
										refreshing={refresh}
										tintColor={customColor['patchwork-light-900']}
										onRefresh={handleRefresh}
									/>
								}
								onScroll={handleScroll}
							/>
						) : (
							<View className="flex-1 items-center justify-center">
								<Flow size={25} color={customColor['patchwork-red-50']} />
							</View>
						)}
						{showScrollToBottom && (
							<Pressable
								onPress={handleScrollToBottom}
								className="w-10 h-10 items-center justify-center absolute z-10 bottom-5 self-center bg-patchwork-light-100 p-3 rounded-full"
							>
								<DownIcon colorScheme={'light'} />
							</Pressable>
						)}
					</View>
					<Animated.View
						style={imageCardWrapperStyle}
						className="bg-patchwork-grey-70"
					>
						<ImageCard composeType="chat" />
					</Animated.View>
					{messageList && (
						<MessageActionsBar
							isFirstMsg={false}
							currentConversation={currentConversation}
							handleScroll={() => {}}
							currentFocusMsgId={initialLastMsgId}
							lastMsg={totalMsgList[0]}
						/>
					)}
					<Animated.View style={virtualKeyboardContainerStyle} />
				</View>
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default ConversationDetail;
