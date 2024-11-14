import { Pressable, View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import FastImage from 'react-native-fast-image';
import { ChevronRightIcon } from '@/util/svg/icon.common';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import { useNavigation } from '@react-navigation/native';

type Props = {
	channel: Pathchwork.ChannelAttributes;
	handlePress: () => void;
};
export const ChannelCard = ({ channel, handlePress }: Props) => {
	return (
		<Pressable className="mb-5 active:opacity-90" onPress={handlePress}>
			<FastImage
				className="w-full h-56 rounded-md"
				source={{
					uri: channel.avatar_image_url,
					priority: FastImage.priority.high,
					cache: FastImage.cacheControl.immutable,
				}}
				resizeMode={'cover'}
			/>
			<View className="absolute bottom-0 bg-black opacity-10 w-full h-56 rounded-md"></View>
			<View className="absolute bottom-2 mx-2 flex-row items-center">
				<ThemeText className="font-bold flex-1">{channel.name}</ThemeText>
				<ChevronRightIcon />
			</View>
		</Pressable>
	);
};
export default ChannelCard;
