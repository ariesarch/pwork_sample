import { Pressable, View } from 'react-native';
import React from 'react';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import FastImage from 'react-native-fast-image';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import InfoButton from '@/components/atoms/conversations/InfoButton/InfoButton';
import { VerifyIcon } from '@/util/svg/icon.conversations';
import { useColorScheme } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import { DEFAULT_API_URL } from '@/util/constant';

type Props = {
	onPressBackButton: () => void;
	chatParticipant: Patchwork.Account | undefined;
};

const ConversationsHeader = ({ onPressBackButton, chatParticipant }: Props) => {
	const { colorScheme } = useColorScheme();
	const navigation = useNavigation();
	const { setDomain } = useActiveDomainAction();

	const handleAvatarPress = () => {
		setDomain(process.env.API_URL ?? DEFAULT_API_URL);
		navigation.navigate('ProfileOther', {
			id: chatParticipant?.id!,
		});
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
				<View className="flex-row items-center flex-shrink ml-3">
					<ThemeText
						numberOfLines={1}
						ellipsizeMode="tail"
						className="font-bold mr-2"
					>
						{chatParticipant?.display_name}
					</ThemeText>
					<VerifyIcon colorScheme={colorScheme} />
				</View>
			</Pressable>
			<View />
		</View>
	);
};

export default ConversationsHeader;
