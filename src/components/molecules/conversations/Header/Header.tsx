import { View } from 'react-native';
import React from 'react';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import FastImage from 'react-native-fast-image';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import InfoButton from '@/components/atoms/conversations/InfoButton/InfoButton';
import { VerifyIcon } from '@/util/svg/icon.conversations';
import { useColorScheme } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { ConversationsStackScreenProps } from '@/types/navigation';

type Props = {
	displayName: string;
	avatar: string;
};

const ConversationsHeader = ({ displayName, avatar }: Props) => {
	const { navigation } = useNavigation<ConversationsStackScreenProps<'Chat'>>();
	const { colorScheme } = useColorScheme();
	return (
		<View className="flex-row justify-center items-center mx-4 mt-4 mb-5">
			<View className="flex:1 absolute left-0 z-10">
				<BackButton
					customOnPress={() => navigation.navigate('StartConversation')}
				/>
			</View>
			<View className="flex-1 flex-row ml-14 items-center">
				<FastImage
					className="w-10 h-10 rounded-full"
					source={{ uri: avatar }}
					resizeMode={FastImage.resizeMode.contain}
				/>
				<ThemeText
					numberOfLines={1}
					ellipsizeMode="tail"
					className="font-bold mx-3"
				>
					{displayName}
				</ThemeText>
				<VerifyIcon colorScheme={colorScheme} />
			</View>
			<View className="flex-1 absolute right-0 z-10">
				<InfoButton onPress={() => {}} />
			</View>
			<View />
		</View>
	);
};

export default ConversationsHeader;
