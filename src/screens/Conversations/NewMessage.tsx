import {
	KeyboardAvoidingView,
	Platform,
	View,
	TextInput,
	ActivityIndicator,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import Header from '@/components/atoms/common/Header/Header';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import SendButton from '@/components/atoms/conversations/SendButton/SendButton';
import BottomSheet, {
	BottomSheetFlatList,
	TouchableOpacity,
} from '@gorhom/bottom-sheet';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {
	Message,
	useChatHistoryStore,
} from '@/store/conversations/chatHistoryStore';
import { ConversationsStackParamList } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useSearchUsers } from '@/hooks/queries/conversations.queries';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';

const PLATFORM_KEYBOARD_OFFSET = Platform.select({
	android: 42,
	ios: 0,
});

const NewMessage = () => {
	const navigation =
		useNavigation<StackNavigationProp<ConversationsStackParamList>>();
	const selectionColor = useAppropiateColorHash('patchwork-red-50');

	const bottomSheetRef = useRef<BottomSheet>(null);
	const messageInputRef = useRef<TextInput>(null);

	const [username, setUsername] = useState<string>('');
	const [messageText, setMessageText] = useState<string>('');
	const [selectedUser, setSelectedUser] = useState<Pathchwork.Account | null>(
		null,
	);
	const snapPoints = useMemo(() => ['50%', '80%'], []);
	const { chatHistory, setChatHistory } = useChatHistoryStore();
	const queryParams = { query: username, resolve: false, limit: 4 };

	const {
		data: searchedUsers,
		isLoading,
		error,
	} = useSearchUsers({
		...queryParams,
		options: { enabled: username.length >= 3 },
	});

	const handleTextChange = useCallback(
		(text: string) => {
			if (selectedUser && text === '') {
				setSelectedUser(null);
				setUsername('');
			} else if (selectedUser) {
				setMessageText(text);
			} else {
				setUsername(text);
				bottomSheetRef.current?.expand();
			}
		},
		[selectedUser],
	);

	const handleUserSelect = useCallback((user: Pathchwork.Account) => {
		bottomSheetRef.current?.close();
		messageInputRef.current?.focus();
		setSelectedUser(user);
		setUsername(user.username);
		setMessageText(' ');
	}, []);

	const handleSend = () => {
		if (selectedUser && messageText) {
			const existingChat = chatHistory.find(
				chat => chat.id === selectedUser.id,
			);
			const message: Message = {
				text: messageText,
				sender: 'me',
				time: moment().format('HH:mm A'),
				status: 'Sent',
			};
			if (!existingChat) {
				setChatHistory(selectedUser.id, selectedUser.username, [message]);
			} else {
				setChatHistory(selectedUser.id, selectedUser.username, [
					...existingChat.messages,
					message,
				]);
			}
			navigation.navigate('Chat', {
				id: selectedUser?.id,
				queryKey: ['users', queryParams],
			});
		}
	};

	const renderItem = useCallback(
		({ item }: { item: Pathchwork.Account }) => (
			<TouchableOpacity onPress={() => handleUserSelect(item)}>
				<View className="p-4 border-b border-gray-200 flex-row">
					<FastImage
						className="w-10 h-10 rounded-full mr-3"
						source={{ uri: item.avatar }}
						resizeMode={FastImage.resizeMode.contain}
					/>
					<View>
						<ThemeText className="text-white">{item.display_name}</ThemeText>
						<ThemeText className="text-white">@{item.username}</ThemeText>
					</View>
				</View>
			</TouchableOpacity>
		),
		[handleUserSelect],
	);

	return (
		<SafeScreen>
			<Header
				title="New Message"
				leftCustomComponent={<BackButton />}
				rightCustomComponent={
					<SendButton
						disabled={!selectedUser || !messageText}
						onPress={handleSend}
					/>
				}
			/>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={PLATFORM_KEYBOARD_OFFSET}
				className="flex-1"
			>
				<View className="p-4 flex-row items-center">
					<ThemeText className="text-patchwork-red-50 mr-2">
						@{selectedUser ? selectedUser.username : ''}
					</ThemeText>
					<TextInput
						ref={messageInputRef}
						placeholder={selectedUser ? '' : 'Username...'}
						placeholderTextColor="gray"
						value={selectedUser ? messageText : username}
						onChangeText={handleTextChange}
						className="text-white flex-1 p-2 px-0"
						autoCapitalize="none"
						selectionColor={selectionColor}
					/>
				</View>

				<BottomSheet
					index={-1}
					ref={bottomSheetRef}
					snapPoints={snapPoints}
					backgroundStyle={{ backgroundColor: 'rgba(64, 75, 82, 1)' }}
					handleIndicatorStyle={{ backgroundColor: '#fff' }}
				>
					{isLoading ? (
						<View className="flex-1 justify-center items-center">
							<ActivityIndicator size="large" color="#ffffff" />
						</View>
					) : searchedUsers?.data?.length && !selectedUser ? (
						<BottomSheetFlatList
							data={searchedUsers.data}
							keyExtractor={item => item.id}
							renderItem={renderItem}
							contentContainerStyle={{
								backgroundColor: 'rgba(64, 75, 82, 1)',
							}}
						/>
					) : (
						!selectedUser && (
							<View className="flex-1 justify-center items-center">
								<ThemeText className="text-white">No user is found!</ThemeText>
							</View>
						)
					)}
				</BottomSheet>
			</KeyboardAvoidingView>
		</SafeScreen>
	);
};

export default NewMessage;
