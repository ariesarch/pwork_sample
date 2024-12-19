import { useGetConversationsList } from '@/hooks/queries/conversations.queries';
import { MessageTabIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { useMemo } from 'react';
import { View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';

const ConversationsTabButton = ({ focused }: { focused: boolean }) => {
	const { colorScheme } = useColorScheme();
	const { data } = useGetConversationsList();

	const unreadCount = useMemo(() => {
		return data?.pages.flat().filter(item => item.unread === true).length ?? 0;
	}, [data]);

	return (
		<View className="relative">
			<MessageTabIcon colorScheme={colorScheme} focused={focused} />
			{unreadCount > 0 && (
				<View className="absolute -top-3 -right-3 z-20 w-5 h-5 rounded-full items-center justify-center bg-patchwork-red-50">
					<ThemeText size={'xs_12'}>
						{unreadCount > 99 ? '99+' : unreadCount}
					</ThemeText>
				</View>
			)}
		</View>
	);
};

export default ConversationsTabButton;
