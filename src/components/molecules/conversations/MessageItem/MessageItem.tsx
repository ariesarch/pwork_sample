import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import MessageContent from '@/components/atoms/conversations/MessageContent/MessageContent';
import { useAuthStore, useAuthStoreAction } from '@/store/auth/authStore';
import { formatMessageDate, isMsgTimeClose } from '@/util/helper/conversation';
import { cn } from '@/util/helper/twutil';
import dayjs from 'dayjs';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

type Prop = {
	message: Pathchwork.Status;
	previousMsg: Pathchwork.Status | undefined;
};
const MessageItem = ({ message, previousMsg }: Prop) => {
	const { userInfo } = useAuthStore();
	const isOwnMessage = userInfo?.id == message.account.id;
	const isTwoMsgFromSameUser = previousMsg?.account.id === message.account.id;
	const isTwoMsgTimeClose = isMsgTimeClose(message, previousMsg);

	return (
		<View className="m-2 flex">
			{!isTwoMsgTimeClose && (
				<ThemeText className="items-center justify-center text-center text-xs mt-2 mb-1 text-gray-400">
					{formatMessageDate(message.created_at)}
				</ThemeText>
			)}
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
				</View>
			</View>
		</View>
	);
};
export default MessageItem;
