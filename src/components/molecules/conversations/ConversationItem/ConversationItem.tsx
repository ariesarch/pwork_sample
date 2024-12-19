import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { appendInstance } from '@/util/helper/appendInstance';
import { cleanText } from '@/util/helper/cleanText';
import { extractMessage } from '@/util/helper/extractMessage';
import { getDurationFromNow } from '@/util/helper/getDurationFromNow';
import React from 'react';
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ListItemProps {
	item: Pathchwork.Conversations;
	userInfoId: string;
	onPress: (id: string) => void;
}

const ConversationItem: React.FC<ListItemProps> = ({
	item,
	onPress,
	userInfoId,
}) => {
	return (
		<Pressable
			onPress={() => onPress(item.id)}
			className="flex-row items-center bg-patchwork-dark-100 p-3 mr-2 ml-2"
		>
			<FastImage
				className="w-14 h-14 rounded-full mr-3"
				source={{ uri: item.accounts[0].avatar }}
				resizeMode={FastImage.resizeMode.contain}
			/>
			<View className="flex-1 mr-6">
				<View className="flex-row items-center">
					<ThemeText variant={'textOrange'}>
						{item.accounts[0].display_name}
					</ThemeText>
					<ThemeText className="text-patchwork-grey-400 ml-3">
						{item.last_status
							? getDurationFromNow(item.last_status.created_at)
							: ''}
					</ThemeText>
				</View>
				<ThemeText size={'fs_13'} className="text-patchwork-grey-400 my-0.5">
					{appendInstance(`@${item.accounts[0].acct}`)}
				</ThemeText>
				<View className="flex-row items-center">
					<ThemeText>
						{item.last_status?.account?.id === userInfoId ? 'You: ' : ''}
					</ThemeText>
					<ThemeText
						className={`w-full ${item.unread ? 'font-bold' : 'font-normal'}`}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{extractMessage(cleanText(item.last_status?.content))}
					</ThemeText>
				</View>
			</View>
			{item.unread && (
				<View className="w-2 h-2 bg-patchwork-red-50 rounded-full mr-2" />
			)}
		</Pressable>
	);
};

export default ConversationItem;
