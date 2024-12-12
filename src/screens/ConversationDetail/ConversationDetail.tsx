import React, { useState } from 'react';
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
import { useFeedRepliesQuery } from '@/hooks/queries/feed.queries';
import { DEFAULT_API_URL } from '@/util/constant';
import MessageItem from '@/components/molecules/conversations/MessageItem/MessageItem';
import useGetCurrentConversation from '@/hooks/custom/useGetCurrentConversation';
import { Flow } from 'react-native-animated-spinkit';
import ProfileInfo from '@/components/molecules/conversations/ProfileInfo/ProfileInfo';

const ConversationDetail = ({
	navigation,
	route,
}: ConversationsStackScreenProps<'ConversationDetail'>) => {
	const { id, isNewMessage } = route.params;
	const { height } = useGradualAnimation();
	const [refresh, setRefresh] = useState(false);
	const currentConversation = useGetCurrentConversation(id);
	const {
		data: messageList,
		isLoading: isMessageLoading,
		refetch: refetchMessageList,
	} = useFeedRepliesQuery({
		domain_name: process.env.API_URL ?? DEFAULT_API_URL,
		id,
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

	return (
		<SafeScreen>
			<ComposeStatusProvider type="chat">
				<View className="flex-1">
					<ConversationsHeader
						onPressBackButton={() => navigation.navigate('ConversationList')}
						chatParticipant={currentConversation?.last_status?.account}
					/>
					<View style={{ flex: 1 }}>
						{messageList && currentConversation?.last_status ? (
							<FlashList
								ListHeaderComponent={() => (
									<ProfileInfo userInfo={currentConversation?.accounts[0]} />
								)}
								data={[
									...messageList?.ancestors,
									currentConversation?.last_status,
								]}
								// inverted
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
					{currentConversation && messageList && (
						<MessageActionsBar
							isFirstMsg={isNewMessage}
							firstMsg={currentConversation}
							handleScroll={() => {}}
						/>
					)}
					<Animated.View style={virtualKeyboardContainerStyle} />
				</View>
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default ConversationDetail;
