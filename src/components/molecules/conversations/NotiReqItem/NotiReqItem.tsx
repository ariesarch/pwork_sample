import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { appendInstance } from '@/util/helper/appendInstance';
import { cleanText } from '@/util/helper/cleanText';
import { extractMessage } from '@/util/helper/extractMessage';
import { getDurationFromNow } from '@/util/helper/getDurationFromNow';
import { removePrivateConvoHashtag } from '@/util/helper/handlePrivateConvoHashtag';
import React from 'react';
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ListItemProps {
	item: Pathchwork.NotiReq;
	onPressAccept: (id: string) => void;
	onPressCancel: (id: string) => void;
}

const NotiReqItem: React.FC<ListItemProps> = ({
	item,
	onPressAccept,
	onPressCancel,
}) => {
	return (
		<View className="flex-row bg-patchwork-dark-100 p-3 mr-2">
			<FastImage
				className="w-14 h-14 rounded-full mr-3"
				source={{ uri: item.account.avatar }}
				resizeMode={FastImage.resizeMode.contain}
			/>
			<View className="flex-1 mr-3">
				<View className="flex-row items-center">
					<ThemeText variant={'textOrange'}>
						{item.account.display_name}
					</ThemeText>
					<ThemeText className="text-patchwork-grey-400 ml-3">
						{item.last_status
							? getDurationFromNow(item.last_status.created_at)
							: ''}
					</ThemeText>
				</View>
				<ThemeText size={'fs_13'} className="text-patchwork-grey-400 my-0.5">
					{appendInstance(`@${item.account.acct}`)}
				</ThemeText>
				<ThemeText className={`w-full`} numberOfLines={1} ellipsizeMode="tail">
					{removePrivateConvoHashtag(
						extractMessage(cleanText(item.last_status?.content)),
					)}
				</ThemeText>
				<View className="flex-row mt-3 justify-end">
					<Pressable
						onPress={() => onPressCancel(item.id)}
						className="border-slate-300 border px-2.5 py-1 rounded-xl"
					>
						<ThemeText>Cancel</ThemeText>
					</Pressable>
					<Pressable
						onPress={() => onPressAccept(item.id)}
						className="bg-green-900 px-3 py-1.5 rounded-xl ml-3"
					>
						<ThemeText>Accept</ThemeText>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default NotiReqItem;
