import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ConversationsListLoading from '@/components/atoms/loading/ConversationsListLoading';
import StartConversation from '@/components/organisms/conversations/StartConversation/StartConversation';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useConversationsList } from '@/hooks/queries/conversations.queries';
import {
	BottomStackParamList,
	ConversationsStackParamList,
} from '@/types/navigation';
import customColor from '@/util/constant/color';
import { cleanText } from '@/util/helper/cleanText';
import { extractMessage } from '@/util/helper/extractMessage';
import { getDurationFromNow } from '@/util/helper/getDurationFromNow';
import { PlusIcon } from '@/util/svg/icon.conversations';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable, RefreshControl, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

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
	const [maxID, setMaxID] = useState<string | null>(null);
	const [conversationsList, setConversationsList] = useState<
		Pathchwork.Conversations[]
	>([]);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const {
		data: _conversationsList,
		isLoading,
		isFetching,
		refetch,
		error,
	} = useConversationsList({ max_id: maxID });

	useEffect(() => {
		if (_conversationsList.data) {
			setConversationsList(prev => [...prev, ..._conversationsList.data]);

			if (_conversationsList.data?.length === 0) {
				setHasMore(false);
			}
			setIsLoadingMore(false);
		}
	}, [_conversationsList]);

	const loadMore = () => {
		if (!hasMore || isLoadingMore) return;

		setIsLoadingMore(true);
		if (conversationsList.length > 0) {
			const lastItem = conversationsList[conversationsList.length - 1];
			const lastStatusId = lastItem.last_status?.id;

			if (lastStatusId) {
				setMaxID(lastStatusId);
			} else {
				setHasMore(false);
				setIsLoadingMore(false);
			}
		}
	};

	return (
		<SafeScreen>
			<Header title="Conversations" leftCustomComponent={<BackButton />} />
			<FlashList
				refreshControl={
					<RefreshControl
						refreshing={isFetching}
						tintColor={customColor['patchwork-light-900']}
						onRefresh={refetch}
					/>
				}
				ListEmptyComponent={
					!isLoading ? (
						<StartConversation onPress={handlePressNewChat} />
					) : (
						<>
							{Array(8)
								.fill(null)
								.map((_, index) => (
									<ConversationsListLoading key={index} />
								))}
						</>
					)
				}
				estimatedItemSize={100}
				estimatedListSize={{
					width: width,
					height: height,
				}}
				contentContainerStyle={{ paddingHorizontal: 10 }}
				data={conversationsList}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }: { item: Pathchwork.Conversations }) => (
					<Pressable
						disabled
						className={`flex-row items-center rounded-2xl p-3 mr-2`}
					>
						<FastImage
							className="w-10 h-10 rounded-full mr-3"
							source={{ uri: item.accounts[0].avatar }}
							resizeMode={FastImage.resizeMode.contain}
						/>
						<View className="flex-1 mr-6">
							<View className="flex-row items-center">
								<ThemeText size={'fs_13'}>
									{item.accounts[0].display_name}
								</ThemeText>
								<ThemeText
									size={'fs_13'}
									className="text-patchwork-grey-400 ml-3"
								>
									{getDurationFromNow(item.last_status.created_at)}
								</ThemeText>
							</View>
							<ThemeText
								size={'xs_12'}
								className="text-patchwork-grey-400 my-0.5"
							>
								@{item.accounts[0].acct}
							</ThemeText>
							<View className="flex-row items-center">
								<ThemeText
									className="w-full"
									size={'xs_12'}
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{extractMessage(cleanText(item.last_status?.content))}
								</ThemeText>
							</View>
						</View>
					</Pressable>
				)}
				onEndReachedThreshold={0.15}
				onEndReached={loadMore}
				ListFooterComponent={
					isLoadingMore ? (
						<ConversationsListLoading />
					) : !hasMore ? (
						<ThemeText className="text-patchwork-grey-400 text-center mb-10 mt-5">
							No more conversations to show
						</ThemeText>
					) : null
				}
			/>
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
