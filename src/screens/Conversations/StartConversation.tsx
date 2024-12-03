import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import HTMLParser from '@/components/atoms/common/ParseHtml/ParseHtml';
import ParseHTMLString from '@/components/atoms/common/ParseHtml/ParseNormalHtmlStr';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ConversationsListLoading from '@/components/atoms/loading/ConversationsListLoading';
import StartConversation from '@/components/organisms/conversations/StartConversation/StartConversation';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useGetConversationsList } from '@/hooks/queries/conversations.queries';
import {
	BottomStackParamList,
	ConversationsStackParamList,
} from '@/types/navigation';
import { PlusIcon } from '@/util/svg/icon.conversations';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';

type MessageScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<BottomStackParamList, 'Conversations'>,
	StackNavigationProp<ConversationsStackParamList>
>;

const Message = ({
	navigation,
}: {
	navigation: MessageScreenNavigationProp;
}) => {
	const handlePressNewChat = () => navigation.navigate('NewMessage');

	const {
		data: conversationsList,
		isLoading,
		error,
	} = useGetConversationsList();

	return (
		<SafeScreen>
			<Header title="Conversations" leftCustomComponent={<BackButton />} />
			{conversationsList?.length === 0 && !isLoading ? (
				<StartConversation onPress={handlePressNewChat} />
			) : (
				<FlatList
					contentContainerStyle={{ paddingHorizontal: 10 }}
					data={isLoading ? Array(8).fill({}) : conversationsList}
					showsVerticalScrollIndicator={false}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) =>
						isLoading ? (
							<ConversationsListLoading />
						) : (
							<Pressable
								disabled
								key={item.id}
								className={`flex-row items-centerrounded-2xl p-3 mb-3`}
							>
								<FastImage
									className="w-10 h-10 rounded-full mr-3"
									source={{ uri: item.accounts[0].avatar }}
									resizeMode={FastImage.resizeMode.contain}
								/>
								<View>
									<ThemeText className="font-semibold">
										{item.accounts[0].display_name}
									</ThemeText>
									<ThemeText
										numberOfLines={1}
										ellipsizeMode="tail"
										className="mr-12"
									>
										<ParseHTMLString status={item.last_status} />
									</ThemeText>
								</View>
							</Pressable>
						)
					}
				/>
			)}
			<Pressable
				onPress={handlePressNewChat}
				className="bg-patchwork-red-50 rounded-full p-3 absolute bottom-5 right-5"
			>
				<PlusIcon />
			</Pressable>
		</SafeScreen>
	);
};

export default Message;
