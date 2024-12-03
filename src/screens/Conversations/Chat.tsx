import React, { useEffect, useRef, useState } from 'react';
import { ConversationsStackScreenProps } from '@/types/navigation';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { BackHandler, ScrollView, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useUserInfo } from '@/store/conversations/userInfoStore';
import { useQueryClient } from '@tanstack/react-query';
import {
	BottomBarHeight,
	useGradualAnimation,
} from '@/hooks/custom/useGradualAnimation';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import ConversationsHeader from '@/components/molecules/conversations/Header/Header';
import MessageActionsBar from '@/components/molecules/conversations/MessageActionsBar/MessageActionsBar';
import { ComposeStatusProvider } from '@/context/composeStatusContext/composeStatus.context';
import ProfileInfo from '@/components/molecules/conversations/ProfileInfo/ProfileInfo';
import { useGetConversationsList } from '@/hooks/queries/conversations.queries';

const Chat = ({ navigation, route }: ConversationsStackScreenProps<'Chat'>) => {
	const scrollViewRef = useRef<ScrollView | null>(null);
	const [_message, setMessage] = useState<string>('');

	const sendMessage = () => {
		// if (_message.trim()) {
		// 	const currentTime = moment().format('HH:mm A');
		// 	const newMessage: Message = {
		// 		text: _message,
		// 		sender: 'me',
		// 		time: currentTime,
		// 		status: 'Sent',
		// 	};
		// 	const existingChatIndex = chatHistory.findIndex(chat => chat.id === id);
		// 	if (existingChatIndex !== -1) {
		// 		const updatedMessages = [
		// 			...chatHistory[existingChatIndex].messages,
		// 			newMessage,
		// 		];
		// 		setChatHistory(
		// 			id,
		// 			userInfo?.display_name!,
		// 			userInfo?.avatar!,
		// 			updatedMessages,
		// 			userInfo?.display_name!,
		// 		);
		// 	} else {
		// 		const newChatMessages = [newMessage];
		// 		setChatHistory(
		// 			id,
		// 			userInfo?.display_name!,
		// 			userInfo?.avatar!,
		// 			newChatMessages,
		// 			userInfo?.display_name!,
		// 		);
		// 	}
		// 	setMessage('');
		// 	setTimeout(() => {
		// 		scrollToEnd();
		// 	}, 0);
		// }
	};

	const {
		data: conversationsList,
		isLoading,
		error,
	} = useGetConversationsList();

	useEffect(() => {
		const handleBackPress = () => {
			navigation.navigate('StartConversation');
			return true;
		};
		BackHandler.addEventListener('hardwareBackPress', handleBackPress);
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
		};
	}, [navigation]);

	const { height } = useGradualAnimation();
	const virtualKeyboardContainerStyle = useAnimatedStyle(() => {
		return {
			height:
				height.value > BottomBarHeight ? height.value - BottomBarHeight : 0,
		};
	});

	const scrollToEnd = () => {
		scrollViewRef.current?.scrollToEnd({ animated: true });
	};

	return (
		<SafeScreen>
			<ComposeStatusProvider type="chat">
				<View className="flex-1">
					{/* Header */}
					<ConversationsHeader
						onPressBackButton={() => navigation.navigate('StartConversation')}
					/>
					<ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
						<ProfileInfo />
						<Animated.View className="flex-1 m-3">
							{/* the send date is needed to be checked on condition */}
							<ThemeText className="self-center">19 Dec 2022</ThemeText>
							{/* {conversationsList.map((chat, i) => (
								<View key={i}>
									{chat.accounts.map((message, j) => (
										<View key={j}>
											<View
												className={`mt-2 ${
													message. === 'me'
														? 'self-end bg-patchwork-red-50'
														: 'self-start bg-gray-300'
												} rounded-t-xl rounded-l-xl px-4 py-2`}
											>
												<ThemeText className="text-white">
													{message.text}
												</ThemeText>
											</View>
											<View
												className={`flex-row items-center ${
													message.sender === 'me' ? 'self-end' : 'self-start'
												}`}
											>
												<ThemeText className={'text-xs text-gray-400 '}>
													{message.time}
												</ThemeText>
												<ThemeText className="text-2xl align-middle mx-2">
													▸
												</ThemeText>
												<ThemeText>{message.status}</ThemeText>
											</View>
										</View>
									))}
								</View>
							))} */}
						</Animated.View>
					</ScrollView>
					<MessageActionsBar
						message={_message}
						handleMessage={setMessage}
						handleSend={sendMessage}
						handleScroll={scrollToEnd}
					/>
					<Animated.View style={virtualKeyboardContainerStyle} />
				</View>
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default Chat;
