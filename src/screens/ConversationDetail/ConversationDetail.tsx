import React, { useEffect, useMemo, useRef } from 'react';
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
import { useGetConversationsList } from '@/hooks/queries/conversations.queries';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { useFeedRepliesQuery } from '@/hooks/queries/feed.queries';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { FlatList } from 'react-native';

type PaginatedChatData = {
	pages: Pathchwork.Conversations[][];
	pageParams: {};
};

const ConversationDetail = ({
	navigation,
	route,
}: ConversationsStackScreenProps<'ConversationDetail'>) => {
	const domain_name = useSelectedDomain();
	const { id, isNewMessage } = route.params;
	const scrollViewRef = useRef<ScrollView | null>(null);
	const { height } = useGradualAnimation();
	const { setUserInfo } = useUserInfo();

	const { data: conversationList, isLoading } = useGetConversationsList({
		enabled: isNewMessage,
	});

	const cachedChatList: PaginatedChatData | undefined =
		queryClient.getQueryData(['conversations']);

	const detailChat: Pathchwork.Conversations | undefined = useMemo(() => {
		if (cachedChatList && !isNewMessage) {
			return cachedChatList.pages.flat().find(v => v?.id === id);
		} else if (conversationList && isNewMessage) {
			return conversationList.pages.flat().find(v => v?.last_status?.id === id);
		}
	}, [cachedChatList]);

	useEffect(() => {
		if (detailChat) {
			setUserInfo(detailChat.accounts[0]);
		}
	}, [detailChat]);

	const {
		data: conversationDetailList,
		isLoading: isLoadingConversationDetailList,
	} = useFeedRepliesQuery({
		domain_name,
		id: detailChat?.last_status?.id!,
	});

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

	//  the list now is showing just the decendants for temporary, currently ancestor is not included.

	return (
		<SafeScreen>
			<ComposeStatusProvider type="chat">
				{isLoading || !detailChat || isLoadingConversationDetailList ? (
					<View className="flex-1 justify-center items-center">
						<Flow size={25} color={customColor['patchwork-red-50']} />
					</View>
				) : (
					<View className="flex-1">
						{/* Header */}
						<ConversationsHeader
							onPressBackButton={() => {
								navigation.navigate('ConversationList');
								setUserInfo(null);
							}}
						/>
						<FlatList
							ListHeaderComponent={() => <ProfileInfo />}
							data={conversationDetailList?.descendants}
							renderItem={({ item, index }) => {
								const nextItem = conversationDetailList?.descendants[index + 1];
								return (
									<View className="px-3">
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
												{extractMessage(cleanText(item.content))}
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
												{moment(item.created_at).format('HH:mm A')}
											</ThemeText>
											<ThemeText className="text-2xl align-middle mx-2">
												▸
											</ThemeText>
											<ThemeText>
												{detailChat?.unread ? 'Sent' : 'Read'}
											</ThemeText>
										</View>
									</View>
								);
							}}
							keyExtractor={item => item.id.toString()}
							showsVerticalScrollIndicator={false}
						/>

						<ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
							<Animated.View className="flex-1 m-3">
								<ThemeText className="self-center">
									{detailChat
										? moment(detailChat?.last_status?.created_at).format(
												'DD MMM YYYY',
										  )
										: moment().format('DD MMM YYYY')}
								</ThemeText>
							</Animated.View>
						</ScrollView>
						<MessageActionsBar
							isFirstMsg={isNewMessage}
							firstMsg={detailChat}
							handleScroll={scrollToEnd}
						/>
						<Animated.View style={virtualKeyboardContainerStyle} />
					</View>
				)}
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default ConversationDetail;
