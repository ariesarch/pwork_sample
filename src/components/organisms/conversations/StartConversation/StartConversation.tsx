import { Pressable, View } from 'react-native';
import React from 'react';
import { AtSignIcon } from '@/util/svg/icon.conversations';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

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
					disabled
					onPress={onPress}
					className="border border-patchwork-grey-100 py-1.5 px-4 rounded-full w-auto"
				>
					<ThemeText variant={'textGrey'}>Start a conversation</ThemeText>
				</Pressable>
			</View>
		</View>
	);
};

export default StartConversation;
