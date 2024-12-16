import { Pressable, View } from 'react-native';
import React from 'react';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import FastImage from 'react-native-fast-image';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import InfoButton from '@/components/atoms/conversations/InfoButton/InfoButton';
import { VerifyIcon } from '@/util/svg/icon.conversations';
import { useColorScheme } from 'nativewind';
import { useNavigation } from '@react-navigation/native';

type Props = {
	onPressBackButton: () => void;
	chatParticipant: Pathchwork.Account | undefined;
};

const ConversationsHeader = ({ onPressBackButton, chatParticipant }: Props) => {
	const { colorScheme } = useColorScheme();
	const navigation = useNavigation();

	const handleAvatarPress = () => {
		if (chatParticipant?.url?.includes('channel.org')) {
			navigation.navigate('ProfileOther', {
				id: chatParticipant.id,
			});
		} else {
			// better if show some toast info
			// console.log('Non-channel participant:', chatParticipant?.url);
		}
	};

	return (
		<View className="flex-row justify-center items-center mx-4 mt-4 mb-5">
			<View className="flex:1 absolute left-0 z-10">
				<BackButton customOnPress={onPressBackButton} />
			</View>
			<Pressable
				onPress={handleAvatarPress}
				className="flex-1 flex-row ml-14 items-center"
			>
				<FastImage
					className="w-10 h-10 rounded-full"
					source={{ uri: chatParticipant?.avatar }}
					resizeMode={FastImage.resizeMode.contain}
				/>
				<ThemeText
					numberOfLines={1}
					ellipsizeMode="tail"
					className="font-bold mx-3"
				>
					{chatParticipant?.display_name}
				</ThemeText>
				<VerifyIcon colorScheme={colorScheme} />
			</Pressable>
			<View className="flex-1 absolute right-0 z-10">
				<InfoButton onPress={() => {}} />
			</View>
			<View />
		</View>
	);
};

export default ConversationsHeader;
