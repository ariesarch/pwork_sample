import { useMemo } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	Pressable,
	RefreshControl,
	View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import { CompositeNavigationProp } from '@react-navigation/native';

import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ConversationsListLoading from '@/components/atoms/loading/ConversationsListLoading';
import StartConversation from '@/components/organisms/conversations/StartConversation/StartConversation';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useMarkAsReadMutation } from '@/hooks/mutations/conversations.mutation';
import { useGetConversationsList } from '@/hooks/queries/conversations.queries';
import { useAuthStore } from '@/store/auth/authStore';
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
import { StackNavigationProp } from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');

type MessageScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<BottomStackParamList, 'Conversations'>,
	StackNavigationProp<ConversationsStackParamList>
>;

const ConversationList = ({
	navigation,
}: {
	navigation: MessageScreenNavigationProp;
}) => {
	// const { userInfo } = useAuthStore();
	// const {
	//  data,
	//  fetchNextPage,
	//  hasNextPage,
	//  isFetchingNextPage,
	//  isLoading,
	//  refetch,
	// } = useGetConversationsList();

	// const { mutate: markConversationAsRead } = useMarkAsReadMutation();
	// const conversationsList = useMemo(() => data?.pages.flat() || [], [data]);

	// // Handlers
	// const handlePressNewChat = () => navigation.navigate('NewMessage');

	// const handleRead = (id: string) => markConversationAsRead({ id });

	// const handleEndReached = () => {
	//  if (!isFetchingNextPage && hasNextPage) fetchNextPage();
	// };

	// // Render items
	// const renderConversationItem = ({
	//  item,
	// }: {
	//  item: Pathchwork.Conversations;
	// }) => (
	//  <Pressable
	//    onPress={() => {
	//      if (item.unread) handleRead(item.id);
	//      navigation.navigate('ConversationDetail', {
	//        id: item.last_status.id,
	//        isNewMessage: false,
	//      });
	//    }}
	//    className="flex-row items-center rounded-2xl p-3 mr-2 my-1"
	//  >
	//    <FastImage
	//      className="w-10 h-10 rounded-full mr-3"
	//      source={{ uri: item.accounts[0].avatar }}
	//      resizeMode={FastImage.resizeMode.contain}
	//    />
	//    <View className="flex-1 mr-6">
	//      <View className="flex-row items-center">
	//        <ThemeText size={'fs_13'} variant={'textOrange'}>
	//          {item.accounts[0].display_name}
	//        </ThemeText>
	//        <ThemeText size={'fs_13'} className="text-patchwork-grey-400 ml-3">
	//          {item.last_status
	//            ? getDurationFromNow(item.last_status.created_at)
	//            : ''}
	//        </ThemeText>
	//      </View>
	//      <ThemeText size={'xs_12'} className="text-patchwork-grey-400 my-0.5">
	//        @{item.accounts[0].acct}
	//      </ThemeText>
	//      <View className="flex-row items-center">
	//        <ThemeText size={'xs_12'}>
	//          {item.last_status?.account?.id === userInfo?.id ? 'You: ' : ''}
	//        </ThemeText>
	//        <ThemeText
	//          className={`w-full ${item.unread ? 'font-bold' : 'font-normal'}`}
	//          size={'xs_12'}
	//          numberOfLines={1}
	//          ellipsizeMode="tail"
	//        >
	//          {extractMessage(cleanText(item.last_status?.content))}
	//        </ThemeText>
	//      </View>
	//    </View>
	//    {item.unread && (
	//      <View className="w-2 h-2 bg-patchwork-red-50 rounded-full mr-2" />
	//    )}
	//  </Pressable>
	// );

	// const renderListFooter = () =>
	//  isFetchingNextPage ? (
	//    <ActivityIndicator
	//      color={customColor['patchwork-red-50']}
	//      size={'large'}
	//      className="my-5"
	//    />
	//  ) : null;

	// const renderListEmptyComponent = () =>
	//  !isLoading ? (
	//    <StartConversation onPress={handlePressNewChat} />
	//  ) : (
	//    Array(8)
	//      .fill(null)
	//      .map((_, index) => <ConversationsListLoading key={index} />)
	//  );

	return (
		<SafeScreen>
			<Header title="Conversations" leftCustomComponent={<BackButton />} />
			<StartConversation onPress={() => {}} />
			{/* <FlashList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            tintColor={customColor['patchwork-light-900']}
            onRefresh={refetch}
          />
        }
        ListEmptyComponent={renderListEmptyComponent}
        estimatedItemSize={100}
        estimatedListSize={{ width, height }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={conversationsList}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={renderConversationItem}
        onEndReachedThreshold={0.15}
        onEndReached={handleEndReached}
        ListFooterComponent={renderListFooter}
      />
      <Pressable
        onPress={handlePressNewChat}
        className="bg-patchwork-red-50 rounded-full p-3 absolute bottom-5 right-5"
      >
        <PlusIcon />
      </Pressable> */}
		</SafeScreen>
	);
};

export default ConversationList;
