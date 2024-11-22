import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { useCurrentTabScrollY } from 'react-native-collapsible-tab-view';
import { cn } from '@/util/helper/twutil';
import { Button } from '../../common/Button/Button';
import VerticalInfo from '@/components/molecules/common/VerticalInfo/VerticalInfo';
import dayjs from 'dayjs';
import Animated, { useAnimatedReaction } from 'react-native-reanimated';
import { useSharedScrollY } from '@/context/sharedScrollContext/sharedScroll.context';
import SocialSection from '@/components/molecules/profile/SocialSection/SocialSection';
import UserStats from '@/components/molecules/profile/UserStats/UserStats';
import Underline from '../../common/Underline/Underline';
import { useNavigation } from '@react-navigation/native';
import { cleanText } from '@/util/helper/cleanText';

type ChannelProps = {
	type: 'Channel';
	channel: Pathchwork.ChannelAbout;
	channelInfo: {
		avatar_image_url: string;
		banner_image_url: string;
		channel_name: string;
	};
};

type ProfileProps = {
	type: 'Profile';
	profile: Pathchwork.Account;
	onPressPlusIcon?: () => void;
	onPressEditIcon?: () => void;
	is_my_account?: boolean;
};

const CollapsibleFeedHeader = (props: ChannelProps | ProfileProps) => {
	const { top } = useSafeAreaInsets();
	const navigation = useNavigation();
	const sharedScrollYOffset = useSharedScrollY('Channel');
	const scrollY = useCurrentTabScrollY();
	const isChannel = props.type == 'Channel';
	useAnimatedReaction(
		() => scrollY.value,
		() => (sharedScrollYOffset.value = scrollY.value),
	);

	return (
		<View>
			<View className="bg-white dark:bg-patchwork-dark-100">
				<FastImage
					className="bg-patchwork-dark-50 h-[140]"
					source={{
						uri: isChannel
							? props.channelInfo?.banner_image_url
							: props.profile?.header,
						priority: FastImage.priority.normal,
					}}
					resizeMode={FastImage.resizeMode.cover}
				/>
				<View className="flex-row mx-4">
					<Animated.View className="flex-1">
						<FastImage
							className={cn(
								'w-[70] h-[70] mt-[-25] bg-patchwork-dark-50  border-patchwork-dark-100 border-4',
								isChannel ? 'rounded-md' : 'rounded-full',
							)}
							source={{
								uri: isChannel
									? props.channelInfo?.avatar_image_url
									: props.profile?.avatar,
								priority: FastImage.priority.normal,
							}}
							resizeMode={FastImage.resizeMode.cover}
						/>
					</Animated.View>
					{props.type === 'Profile' && props.is_my_account ? (
						<Button
							variant="default"
							size="sm"
							className="bg-transparent border-white border rounded-3xl px-6 mt-5"
							onPress={() => navigation.navigate('EditProfile')}
						>
							<ThemeText size={'fs_13'}>Edit account</ThemeText>
						</Button>
					) : (
						<Button
							variant="default"
							size="sm"
							className="bg-slate-100 dark:bg-white rounded-3xl px-6 mt-5"
						>
							<ThemeText className="text-black" size={'fs_13'}>
								Follow
							</ThemeText>
						</Button>
					)}
				</View>
				{isChannel ? (
					<VerticalInfo
						accountName={props.channelInfo.channel_name}
						username={props.channel.contact?.account?.username}
						joinedDate={dayjs(
							props.channel.contact?.account?.created_at,
						).format('MMM YYYY')}
						userBio={props.channel?.description}
						showChannelFollowers
					/>
				) : (
					<>
						<VerticalInfo
							hasRedMark
							accountName={props.profile?.display_name}
							username={props.profile?.acct}
							joinedDate={dayjs(props.profile?.created_at).format('MMM YYYY')}
							userBio={props.profile?.about_me}
						/>
						<ThemeText className="mx-3">
							{cleanText(props.profile?.note)}
						</ThemeText>
						<SocialSection
							isMyAccount={props.is_my_account}
							fields={props.profile.fields}
							onPressEditIcon={props.onPressEditIcon}
							onPressPlusIcon={props.onPressPlusIcon}
						/>
						<UserStats
							posts={props.profile?.collection_count}
							following={props.profile?.following_count}
							followers={props.profile?.followers_count}
						/>
						<Underline className="mb-2 mt-4" />
					</>
				)}
			</View>
		</View>
	);
};
export default CollapsibleFeedHeader;
