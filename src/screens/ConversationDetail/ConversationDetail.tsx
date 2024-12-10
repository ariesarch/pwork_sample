import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { queryClient } from '@/App';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { extractMessage } from '@/util/helper/extractMessage';
import { cleanText } from '@/util/helper/cleanText';
import moment from 'moment';
import { useUserInfo } from '@/store/conversations/userInfoStore';

type PaginatedChatData = {
	pages: Pathchwork.Conversations[][];
	pageParams: {};
};

const ConversationDetail = ({
	navigation,
	route,
}: ConversationsStackScreenProps<'ConversationDetail'>) => {
	const { id } = route.params;
	const scrollViewRef = useRef<ScrollView | null>(null);
	const { height } = useGradualAnimation();
	const { userInfo, setUserInfo } = useUserInfo();
	const [_message, setMessage] = useState<string>('');

	const cachedChatList: PaginatedChatData | undefined =
		queryClient.getQueryData(['conversations']);

	const cachedDetailChat: Pathchwork.Conversations | undefined = useMemo(() => {
		if (cachedChatList) {
			return cachedChatList.pages
				.flat()
				.filter(
					(item, index, self) =>
						index === self.findIndex(t => t.id === item.id),
				)
				.find(v => v.id === id);
		}
	}, [cachedChatList]);

	useEffect(() => {
		if (cachedDetailChat) {
			setUserInfo(cachedDetailChat.accounts[0]);
		}
	}, [cachedDetailChat]);

	useEffect(() => {
		const handleBackPress = () => {
			navigation.navigate('ConversationList');
			return true;
		};
		BackHandler.addEventListener('hardwareBackPress', handleBackPress);
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
		};
	}, [navigation]);

	const virtualKeyboardContainerStyle = useAnimatedStyle(() => {
		return {
			height:
				height.value > BottomBarHeight ? height.value - BottomBarHeight : 0,
		};
	});

	const scrollToEnd = () => {
		scrollViewRef.current?.scrollToEnd({ animated: true });
	};

	useEffect(() => scrollToEnd(), []);

	return (
		<SafeScreen>
			<ComposeStatusProvider type="chat">
				<View className="flex-1">
					{/* Header */}
					<ConversationsHeader
						onPressBackButton={() => {
							navigation.navigate('ConversationList');
							setUserInfo(null);
						}}
					/>
					<ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
						<ProfileInfo />
						<Animated.View className="flex-1 m-3">
							<ThemeText className="self-center">
								{cachedDetailChat
									? moment(cachedDetailChat?.last_status?.created_at).format(
											'DD MMM YYYY',
									  )
									: moment().format('DD MMM YYYY')}
							</ThemeText>
							{cachedDetailChat && (
								<>
									<View
										className={`mt-2 ${
											// chat.accounts[0].id !== === 'me'
											// ?
											'self-end bg-patchwork-red-50'
											// : 'self-start bg-gray-300'
										} rounded-t-xl rounded-l-xl px-4 py-2`}
										style={{
											maxWidth: '66.67%',
										}}
									>
										<ThemeText className="text-white">
											{extractMessage(
												cleanText(cachedDetailChat.last_status?.content),
											)}
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
											{moment(cachedDetailChat.last_status?.created_at).format(
												'HH:mm A',
											)}
										</ThemeText>
										<ThemeText className="text-2xl align-middle mx-2">
											▸
										</ThemeText>
										<ThemeText>
											{cachedDetailChat?.unread ? 'Read' : 'Sent'}
										</ThemeText>
									</View>
								</>
							)}
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

export default ConversationDetail;
