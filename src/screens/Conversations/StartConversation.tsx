import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useChatHistoryStore } from '@/store/conversations/chatHistoryStore';
import {
	BottomStackParamList,
	ConversationsStackParamList,
} from '@/types/navigation';
import { AtSignIcon } from '@/util/svg/icon.conversations';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';

type MessageScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<BottomStackParamList, 'Conversations'>,
	StackNavigationProp<ConversationsStackParamList>
>;

const StartConversation = ({ onPress }: { onPress: () => void }) => {
	return (
		<View className="container mx-auto p-10 mt-8">
			<AtSignIcon className="self-center" />
			<ThemeText className="text-md font-bold text-center mt-3">
				No Conversations
			</ThemeText>
			<ThemeText className="text-center mt-3 font-normal">
				Here you can chat with other people around, share posts, discuss and
				more
			</ThemeText>
			<View className="mt-5 flex-row justify-center">
				<Pressable
					onPress={onPress}
					className="border border-patchwork-grey-100 py-1.5 px-4 rounded-full w-auto"
				>
					<ThemeText>Start a conversation</ThemeText>
				</Pressable>
			</View>
		</View>
	);
};

const Message = ({
	navigation,
}: {
	navigation: MessageScreenNavigationProp;
}) => {
	const chatHistory = useChatHistoryStore(state => state.chatHistory);
	const handlePressNewChat = () => navigation.navigate('NewMessage');
	return (
		<SafeScreen>
			<Header title="Conversations" leftCustomComponent={<BackButton />} />
			{chatHistory.length === 0 ? (
				<StartConversation onPress={handlePressNewChat} />
			) : (
				<ScrollView className="p-4">
					{chatHistory.map((chat, index) => (
						<Pressable
							key={chat.id}
							onPress={() => {
								navigation.navigate('Chat', {
									id: chat.id,
									queryKey: [
										'users',
										{ query: chat.name, resolve: false, limit: 4 },
									],
								});
							}}
							className={`py-4 flex-row ${
								index < chatHistory.length - 1 ? 'border-b border-gray-300' : ''
							}`}
						>
							<FastImage
								className="w-10 h-10 rounded-full mr-3"
								source={require('../../../assets/images/mock/conversations/mockUserAvatar.png')}
								resizeMode={FastImage.resizeMode.contain}
							/>
							<View>
								<ThemeText className="text-lg font-semibold">
									{chat.name}
								</ThemeText>
								<ThemeText className="text-gray-500">
									{chat.messages[chat.messages.length - 1]?.text}
								</ThemeText>
							</View>
						</Pressable>
					))}
					<View className="mt-5 flex-row justify-center">
						<Pressable
							onPress={handlePressNewChat}
							className="border border-patchwork-grey-100 py-1.5 px-4 rounded-full w-auto"
						>
							<ThemeText>New Chat</ThemeText>
						</Pressable>
					</View>
				</ScrollView>
			)}
		</SafeScreen>
	);
};

export default Message;
