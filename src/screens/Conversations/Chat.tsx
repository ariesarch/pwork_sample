import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ConversationsStackScreenProps } from '@/types/navigation';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import {
	BackHandler,
	Pressable,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import InfoButton from '@/components/atoms/conversations/InfoButton/InfoButton';
import FastImage from 'react-native-fast-image';
import { cn } from '@/util/helper/twutil';
import { VerifyIcon } from '@/util/svg/icon.conversations';
import { useColorScheme } from 'nativewind';
import { ComposeGalleryIcon, ComposeGifIcon } from '@/util/svg/icon.compose';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	Message,
	useChatHistoryStore,
} from '@/store/conversations/chatHistoryStore';
import moment from 'moment';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const Chat = ({ navigation, route }: ConversationsStackScreenProps<'Chat'>) => {
	const scrollViewRef = useRef<KeyboardAwareScrollView | null>(null);
	const queryClient = useQueryClient();
	const { id, queryKey } = route.params;
	const { colorScheme } = useColorScheme();
	const { chatHistory, setChatHistory } = useChatHistoryStore();
	const [_message, setMessage] = useState<string>('');
	const cachedUserInfo: AxiosResponse<Pathchwork.Account[]> | undefined =
		queryKey ? queryClient.getQueryData(queryKey) : undefined;

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
				setChatHistory(id, userInfo?.display_name!, updatedMessages);
			} else {
				const newChatMessages = [newMessage];
				setChatHistory(id, userInfo?.display_name!, newChatMessages);
			}

			setMessage('');
			setTimeout(() => {
				scrollViewRef.current?.scrollToEnd(true);
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

	if (!userInfo) return null;
	return (
		<SafeScreen>
			{/* header */}
			<View className="flex-row justify-center items-center mx-4 mt-4 mb-5">
				<View className="absolute left-0 z-10">
					<BackButton
						customOnPress={() => navigation.navigate('StartConversation')}
					/>
				</View>
				<View className="flex-1 flex-row ml-14 items-center">
					<FastImage
						className="w-10 h-10 rounded-full"
						source={{ uri: userInfo.avatar }}
						resizeMode={FastImage.resizeMode.contain}
					/>
					<ThemeText
						numberOfLines={1}
						ellipsizeMode="tail"
						className="font-bold mx-3"
					>
						{userInfo.display_name}
					</ThemeText>
					<VerifyIcon colorScheme={colorScheme} />
				</View>
				<View className="absolute right-0 z-10">
					<InfoButton onPress={() => {}} />
				</View>
				<View />
			</View>
			<KeyboardAwareScrollView
				enableOnAndroid
				extraScrollHeight={85}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				{/* profile info */}
				<View className="flex-1 -mt-3">
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
				<View className="m-3">
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
										<ThemeText className="text-white">{message.text}</ThemeText>
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
				</View>
			</KeyboardAwareScrollView>
			{/* keyboard and input */}
			<View className="flex-row items-center px-2 py-1 bg-patchwork-grey-70">
				<Pressable
					className={'mr-3'}
					children={<ComposeGalleryIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<ComposeGifIcon {...{ colorScheme }} />}
				/>
				<TextInput
					value={_message}
					onChangeText={setMessage}
					placeholder="Your message..."
					className="flex-1 rounded-md px-4 py-2 border-gray-300 bg-patchwork-grey-400 text-white"
					placeholderTextColor={'#fff'}
					autoFocus
				/>
				<TouchableOpacity
					onPress={sendMessage}
					className="ml-2 rounded-full p-3"
				>
					<ThemeText
						className={`border-[1] border-[1px]  py-[6] px-3 rounded-full  ${
							_message
								? 'text-patchwork-red-50 border-patchwork-red-50'
								: 'border-patchwork-grey-100 text-patchwork-grey-100'
						}`}
					>
						Send
					</ThemeText>
				</TouchableOpacity>
			</View>
		</SafeScreen>
	);
};

export default Chat;
