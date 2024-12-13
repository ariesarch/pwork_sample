import React, { useEffect, useMemo, useState } from 'react';
import { ConversationsStackScreenProps } from '@/types/navigation';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { BackHandler, Dimensions, ScrollView, View } from 'react-native';
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
import { removeOldMsgListCacheAndCreateNewOne } from '@/util/cache/conversation/conversationCahce';
import useGetReceiver from '@/hooks/custom/useGetReceiver';
import ProfileInfo from '@/components/molecules/conversations/ProfileInfo/ProfileInfo';

const ConversationDetail = ({
	navigation,
	route,
}: ConversationsStackScreenProps<'ConversationDetail'>) => {
	const { id: initialLastMsgId, isNewMessage } = route.params;
	const { height } = useGradualAnimation();
	const [refresh, setRefresh] = useState(false);
	const currentConversation = useGetCurrentConversation(initialLastMsgId);
	const receiver = currentConversation?.accounts[0];

	const {
		data: messageList,
		isLoading: isMessageLoading,
		refetch: refetchMessageList,
	} = useMessageListQuery({
		id: initialLastMsgId,
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

	return (
		<SafeScreen>
			<ComposeStatusProvider type="chat">
				<View className="flex-1">
					<ConversationsHeader
						onPressBackButton={() => navigation.navigate('ConversationList')}
						chatParticipant={receiver}
					/>
					<View style={{ flex: 1 }}>
						{totalMsgList && !isMessageLoading && receiver ? (
							<FlashList
								ListFooterComponent={() => <ProfileInfo userInfo={receiver} />}
								inverted
								data={totalMsgList}
								renderItem={({ item, index }) => {
									const previousMsg =
										index > 0 ? messageList?.ancestors[index - 1] : undefined;
									return (
										<MessageItem message={item} previousMsg={previousMsg} />
									);
								}}
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
							/>
						) : (
							<View className="flex-1 items-center justify-center">
								<Flow size={25} color={customColor['patchwork-red-50']} />
							</View>
						)}
					</View>
					{messageList && (
						<MessageActionsBar
							isFirstMsg={isNewMessage}
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
