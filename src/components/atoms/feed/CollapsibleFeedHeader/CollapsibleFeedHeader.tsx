import { Pressable, View } from 'react-native';
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
import { useUserRelationshipMutation } from '@/hooks/mutations/profile.mutation';
import { createRelationshipQueryKey } from '@/hooks/queries/profile.queries';
import { queryClient } from '@/App';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { AccountInfoQueryKey } from '@/types/queries/profile.type';
import { useAuthStore } from '@/store/auth/authStore';

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
	relationships?: Pathchwork.RelationShip[];
	myAcctId?: string;
};

const CollapsibleFeedHeader = (props: ChannelProps | ProfileProps) => {
	const { top } = useSafeAreaInsets();
	const navigation = useNavigation();
	const sharedScrollYOffset = useSharedScrollY('Channel');
	const scrollY = useCurrentTabScrollY();
	const isChannel = props.type == 'Channel';
	const isProfile = props.type == 'Profile';
	useAnimatedReaction(
		() => scrollY.value,
		() => (sharedScrollYOffset.value = scrollY.value),
	);

	const { userInfo } = useAuthStore();

	const { mutate, isPending } = useUserRelationshipMutation({
		onSuccess: (newRelationship, { accountId }) => {
			const acctInfoQueryKey: AccountInfoQueryKey = [
				'get_account_info',
				{ id: isProfile && props.is_my_account ? userInfo?.id! : accountId },
			];
			queryClient.invalidateQueries({ queryKey: acctInfoQueryKey });

			const relationshipQueryKey = createRelationshipQueryKey([
				accountId,
				accountId,
			]);

			queryClient.setQueryData<Pathchwork.RelationShip[]>(
				relationshipQueryKey,
				old => {
					if (!old) return [newRelationship];
					return old.map(rel =>
						rel.id === accountId ? { ...rel, ...newRelationship } : rel,
					);
				},
			);
		},
	});

	const onMakeRelationship = () => {
		if (isProfile && props.profile.id) {
			mutate({
				accountId: props.profile.id,
				isFollowing: props.relationships
					? props.relationships[0]?.following
					: false,
			});
		}
	};

	const displayFollowActionText = () => {
		if (isProfile) {
			if (props.relationships && props.relationships[0]?.following) {
				return 'Following';
			}
			return 'Follow';
		}
	};

	const onPressPreview = (imageUrl: string) => {
		navigation.navigate('LocalImageViewer', {
			imageUrl: {
				url: imageUrl,
			},
		});
	};

	const renderProfileActions = () => {
		if (isChannel) return null;

		if (props.is_my_account) {
			return (
				<Button
					variant="default"
					size="sm"
					className="bg-transparent border-white border rounded-3xl px-6 mt-5"
					onPress={() => navigation.navigate('EditProfile')}
				>
					<ThemeText size={'fs_13'}>Edit account</ThemeText>
				</Button>
			);
		}

		return (
			<Button
				variant="default"
				size="sm"
				className="bg-slate-100 dark:bg-white rounded-3xl px-6 mt-5"
				onPress={onMakeRelationship}
			>
				{isPending ? (
					<Flow size={25} color={customColor['patchwork-dark-900']} />
				) : (
					<ThemeText className="text-black" size={'fs_13'}>
						{displayFollowActionText()}
					</ThemeText>
				)}
			</Button>
		);
	};

	return (
		<View>
			<View className="bg-white dark:bg-patchwork-dark-100">
				<Pressable
					onPress={() =>
						onPressPreview(
							isChannel
								? props.channelInfo?.banner_image_url
								: props.profile?.header,
						)
					}
				>
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
				</Pressable>
				<View className="flex-row mx-4">
					<Animated.View className="flex-1">
						<Pressable
							onPress={() =>
								onPressPreview(
									isChannel
										? props.channelInfo?.avatar_image_url
										: props.profile?.avatar,
								)
							}
						>
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
						</Pressable>
					</Animated.View>
					{renderProfileActions()}
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
							userBio={cleanText(props.profile?.note)}
						/>
						<SocialSection
							isMyAccount={props.is_my_account}
							fields={props.profile?.fields}
							onPressEditIcon={props.onPressEditIcon}
							onPressPlusIcon={props.onPressPlusIcon}
						/>
						<UserStats
							posts={props.profile.statuses_count}
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
