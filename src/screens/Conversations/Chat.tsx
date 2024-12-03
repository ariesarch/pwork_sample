import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ConversationsStackScreenProps } from '@/types/navigation';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { BackHandler, Pressable, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { cn } from '@/util/helper/twutil';
import { VerifyIcon } from '@/util/svg/icon.conversations';
import { useColorScheme } from 'nativewind';
import {
	Message,
	useChatHistoryStore,
} from '@/store/conversations/chatHistoryStore';
import moment from 'moment';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
	BottomBarHeight,
	useGradualAnimation,
} from '@/hooks/custom/useGradualAnimation';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import ConversationsHeader from '@/components/molecules/conversations/Header/Header';
import MessageActionsBar from '@/components/molecules/conversations/MessageActionsBar/MessageActionsBar';

const Chat = ({ navigation, route }: ConversationsStackScreenProps<'Chat'>) => {
	const scrollViewRef = useRef<ScrollView | null>(null);
	const queryClient = useQueryClient();
	const { id, queryKey } = route.params;
	const { colorScheme } = useColorScheme();
	const { chatHistory, setChatHistory } = useChatHistoryStore();
	const [_message, setMessage] = useState<string>('');

	const cachedUserInfo: AxiosResponse<Pathchwork.Account[]> =
		queryClient.getQueryData(queryKey)!;

	const userInfo = useMemo(() => {
		if (cachedUserInfo) return cachedUserInfo.data.find(v => v.id === id);
	}, [cachedUserInfo, id]);

	const sendMessage = () => {
		if (_message.trim()) {
			const currentTime = moment().format('HH:mm A');
			const newMessage: Message = {
				text: _message,
				sender: 'me',
				time: currentTime,
				status: 'Sent',
			};

			const existingChatIndex = chatHistory.findIndex(chat => chat.id === id);
			if (existingChatIndex !== -1) {
				const updatedMessages = [
					...chatHistory[existingChatIndex].messages,
					newMessage,
				];
				setChatHistory(
					id,
					userInfo?.display_name!,
					userInfo?.avatar!,
					updatedMessages,
					userInfo?.display_name!,
				);
			} else {
				const newChatMessages = [newMessage];
				setChatHistory(
					id,
					userInfo?.display_name!,
					userInfo?.avatar!,
					newChatMessages,
					userInfo?.display_name!,
				);
			}
			setMessage('');
			setTimeout(() => {
				scrollToEnd();
			}, 0);
		}
	};

	const _chatHistory = useMemo(() => {
		return chatHistory.filter(chat => chat.id === id);
	}, [chatHistory, id]);

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

	if (!userInfo) return null;
	return (
		<SafeScreen>
			<View className="flex-1">
				{/* Header */}
				<ConversationsHeader
					displayName={userInfo.display_name}
					avatar={userInfo.avatar}
				/>
				<ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
					{/* profile info */}
					<View className=" -mt-3">
						<FastImage
							className="w-full h-28 rounded-b-md"
							source={{ uri: userInfo.header_static }}
							resizeMode={FastImage.resizeMode.cover}
						/>
						<FastImage
							className={cn(
								'w-[80] h-[80] mt-[-50] bg-patchwork-grey-50  border-patchwork-grey-50 border-2 rounded-full mx-auto',
							)}
							source={{ uri: userInfo.avatar }}
							resizeMode={FastImage.resizeMode.contain}
						/>
						<View className="mx-auto items-center">
							<View className="flex-row my-3 items-center mb-0">
								<ThemeText className="font-bold text-lg mr-3">
									{userInfo.display_name}
								</ThemeText>
								<VerifyIcon colorScheme={colorScheme} />
							</View>
							<View className="flex-row items-center mb-1">
								<ThemeText className="">@{userInfo.username}</ThemeText>
								<ThemeText className="text-2xl align-middle mx-2">▸</ThemeText>
								<ThemeText className="">
									Joined on {moment(userInfo.created_at).format('MM YYYY')}
								</ThemeText>
							</View>
							<Pressable
								onPress={() => {}}
								className="border-[1] border-[1px] border-patchwork-grey-100 py-[6] px-3 rounded-full"
							>
								<ThemeText>Follow</ThemeText>
							</Pressable>
						</View>
					</View>
					<Animated.View className="flex-1 m-3">
						{/* the send date is needed to be checked on condition */}
						<ThemeText className="self-center">19 Dec 2022</ThemeText>
						{_chatHistory.map((chat, i) => (
							<View key={i}>
								{chat.messages.map((message, j) => (
									<View key={j}>
										<View
											className={`mt-2 ${
												message.sender === 'me'
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
						))}
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
		</SafeScreen>
	);
};

export default Chat;
