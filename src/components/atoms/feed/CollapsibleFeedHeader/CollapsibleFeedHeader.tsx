import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { useCurrentTabScrollY } from 'react-native-collapsible-tab-view';
import {
	EllipsisIcon,
	ProfileBackIcon,
	SearchIconInProfile,
} from '@/util/svg/icon.profile';
import AccountName from '../../profile/AccountName';
import { cn } from '@/util/helper/twutil';
import { Button } from '../../common/Button/Button';
import ProfileInfo from '@/components/organisms/profile/ProfileInfo';
import VerticalInfo from '@/components/molecules/common/VerticalInfo/VerticalInfo';
import dayjs from 'dayjs';
import Animated, {
	interpolate,
	SharedValue,
	useAnimatedReaction,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { useSharedScrollY } from '@/context/sharedScrollContext';
import { SolidHeaderDepth } from '../FeedTitleHeader/FeedTitleHeader';

type Props = {
	channelAbout: Pathchwork.ChannelAbout;
};
const CollapsibleFeedHeader = ({ channelAbout }: Props) => {
	const { top } = useSafeAreaInsets();
	const sharedScrollYOffset = useSharedScrollY('Channel');
	const scrollY = useCurrentTabScrollY();

	useAnimatedReaction(
		() => scrollY.value,
		() => (sharedScrollYOffset.value = scrollY.value),
	);

	return (
		<View className="bg-white dark:bg-patchwork-dark-100">
			<FastImage
				className="bg-patchwork-grey-50 h-[140]"
				source={{
					uri: channelAbout?.contact.account.header,
					priority: FastImage.priority.normal,
				}}
				resizeMode={FastImage.resizeMode.cover}
			/>
			<View className="flex-row mx-4">
				<Animated.View className="flex-1">
					<FastImage
						className="w-[70] h-[70] mt-[-25]  bg-patchwork-grey-50 rounded-md border-patchwork-dark-100 border-4"
						source={{
							uri: channelAbout?.contact.account.avatar,
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.contain}
					/>
				</Animated.View>
				<Button
					variant="default"
					className="bg-slate-100 dark:bg-white rounded-3xl px-6 mt-3"
				>
					<ThemeText className="text-black">Follow</ThemeText>
				</Button>
			</View>
			<VerticalInfo
				accountName={channelAbout.title}
				username={channelAbout.contact.account.username}
				joinedDate={dayjs(channelAbout.contact.account.created_at).format(
					'MMM YYYY',
				)}
				userBio={channelAbout.description}
				showChannelFollowers
			/>
		</View>
	);
};
export default CollapsibleFeedHeader;
