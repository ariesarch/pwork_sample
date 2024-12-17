import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import MessageContent from '@/components/atoms/conversations/MessageContent/MessageContent';
import MessageImage from '@/components/atoms/conversations/MessageImage/MessageImage';
import { useAuthStore } from '@/store/auth/authStore';
import {
	formatMessageDate,
	formatMessageSentTime,
	isMsgTimeClose,
} from '@/util/helper/conversation';
import { cn } from '@/util/helper/twutil';
import { Pressable, View } from 'react-native';

type Prop = {
	message: Pathchwork.Status;
	previousMsg: Pathchwork.Status | undefined;
	currentMessageId: string | null;
	handlePress: (id: string | null) => void;
};
const MessageItem = ({
	message,
	previousMsg,
	currentMessageId,
	handlePress,
}: Prop) => {
	const { userInfo } = useAuthStore();
	const isOwnMessage = userInfo?.id == message.account.id;
	const isTwoMsgFromSameUser = previousMsg?.account.id === message.account.id;
	const isTwoMsgTimeClose = isMsgTimeClose(message, previousMsg);
	const showMsgTime = currentMessageId === message.id;

	const onPress = () => {
		const newId = showMsgTime ? null : message.id;
		handlePress(newId);
	};

	return (
		<Pressable onPress={onPress} className="m-2 flex">
			{!isTwoMsgTimeClose && (
				<ThemeText className="items-center justify-center text-center text-xs mt-2 mb-1 text-gray-400">
					{formatMessageDate(message.created_at)}
				</ThemeText>
			)}
			<MessageImage className="w-auto flex-1" {...{ message, isOwnMessage }} />
			<View
				className={cn(
					'flex-row items-end',
					isOwnMessage ? 'justify-end' : 'justify-start',
				)}
			>
				<View
					className={cn(isOwnMessage ? 'item-end' : 'item-start')}
					style={{ maxWidth: '75%' }}
				>
					<MessageContent item={message} isOwnMessage={isOwnMessage} />
					{showMsgTime && (
						<ThemeText
							className={cn(
								'mx-2 mt-1',
								isOwnMessage ? 'self-end' : 'self-start',
							)}
							size={'xs_12'}
						>
							{formatMessageSentTime(message.created_at)}
						</ThemeText>
					)}
				</View>
			</View>
		</Pressable>
	);
};
export default MessageItem;
