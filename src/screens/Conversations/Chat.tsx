import React, { useEffect, useRef, useState } from 'react';
import { ConversationsStackScreenProps } from '@/types/navigation';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { BackHandler, ScrollView, View } from 'react-native';
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
import { queryClient } from '@/App';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { extractMessage } from '@/util/helper/extractMessage';
import { cleanText } from '@/util/helper/cleanText';
import moment from 'moment';

const Chat = ({ navigation, route }: ConversationsStackScreenProps<'Chat'>) => {
	const scrollViewRef = useRef<ScrollView | null>(null);
	const [_message, setMessage] = useState<string>('');

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

	useEffect(() => {
		scrollViewRef.current?.scrollToEnd({ animated: true });
	}, []);

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
							{/* {conversationsList &&
								[...conversationsList].reverse().map((chat, i) => (
									<View key={i}>
										<View
											className={`mt-2 ${
												// chat.accounts[0].id !== === 'me'
												// ?
												'self-end bg-patchwork-red-50'
												// : 'self-start bg-gray-300'
											} rounded-t-xl rounded-l-xl px-4 py-2`}
										>
											<ThemeText className="text-white">
												{extractMessage(cleanText(chat.last_status?.content))}
											</ThemeText>
										</View>
										<View
											className={`flex-row items-center ${
												// chat.sender === 'me' ?
												'self-end'
												// :
												// 'self-start'
											}`}
										>
											<ThemeText className={'text-xs text-gray-400 '}>
												{moment(chat.last_status?.created_at).format('HH:mm A')}
											</ThemeText>
											<ThemeText className="text-2xl align-middle mx-2">
												▸
											</ThemeText>
											<ThemeText>{chat?.unread ? 'Read' : 'Sent'}</ThemeText>
										</View>
									</View>
								))} */}
						</Animated.View>
					</ScrollView>
					<MessageActionsBar
						message={_message}
						handleMessage={setMessage}
						handleScroll={scrollToEnd}
					/>
					<Animated.View style={virtualKeyboardContainerStyle} />
				</View>
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default Chat;
