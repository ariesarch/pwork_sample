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
import { useUserRelationshipMutation } from '@/hooks/mutations/profile.mutation';
import { createRelationshipQueryKey } from '@/hooks/queries/profile.queries';
import { queryClient } from '@/App';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { AccountInfoQueryKey } from '@/types/queries/profile.type';
import { useAuthStore } from '@/store/auth/authStore';
import { MessageDotsIcon } from '@/util/svg/icon.profile';
import { useColorScheme } from 'nativewind';
import { useGetConversationByUserId } from '@/hooks/queries/conversations.queries';
import { profile } from 'console';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { useBlockUnBlockUserMutation } from '@/hooks/queries/feed.queries';
import { updateBlockState } from '@/util/cache/statusActions/muteblockCache';
import AccountShield from '@/components/organisms/profile/AccountShield/AccountShield';

type ChannelProps = {
	type: 'Channel';
	channel: Patchwork.ChannelAbout;
	channelInfo: {
		avatar_image_url: string;
		banner_image_url: string;
		channel_name: string;
	};
};

type ProfileProps = {
	type: 'Profile';
	profile: Patchwork.Account;
	onPressPlusIcon?: () => void;
	onPressEditIcon?: () => void;
	is_my_account?: boolean;
	relationships?: Patchwork.RelationShip[];
	myAcctId?: string;
	specifyServerAccId?: string;
	otherUserId?: string;
	isMainChannel?: boolean;
	isOwnChannelFeed?: boolean;
};

const CollapsibleFeedHeader = (props: ChannelProps | ProfileProps) => {
	const { top } = useSafeAreaInsets();
	const navigation = useNavigation();
	const sharedScrollYOffset = useSharedScrollY('Channel');
	const scrollY = useCurrentTabScrollY();
	const { colorScheme } = useColorScheme();

	const domain_name = useSelectedDomain();

	const isChannel = props.type == 'Channel';
	const isProfile = props.type == 'Profile';
	const acctId = isProfile && props.otherUserId;

	useAnimatedReaction(
		() => scrollY.value,
		() => (sharedScrollYOffset.value = scrollY.value),
	);

	const { data: userConversation } = useGetConversationByUserId({
		id: props.type == 'Profile' ? props.profile.id : '',
		options: {
			enabled: props.type == 'Profile' && !props.is_my_account,
		},
	});

	const { userInfo } = useAuthStore();

	const { mutate, isPending } = useUserRelationshipMutation({
		onSuccess: (newRelationship, { accountId }) => {
			const acctInfoQueryKey: AccountInfoQueryKey = [
				'get_account_info',
				{
					id: acctId as string,
					domain_name: domain_name,
				},
			];
			const myAcctInfoQueryKey: AccountInfoQueryKey = [
				'get_account_info',
				{
					id: userInfo?.id!,
					domain_name: domain_name,
				},
			];
			queryClient.invalidateQueries({ queryKey: acctInfoQueryKey });
			queryClient.invalidateQueries({ queryKey: myAcctInfoQueryKey });

			const relationshipQueryKey = createRelationshipQueryKey([
				accountId,
				accountId,
			]);

			queryClient.setQueryData<Patchwork.RelationShip[]>(
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

	const { mutate: toggleBlock, isPending: isBlockInProgress } =
		useBlockUnBlockUserMutation({
			onSuccess: (response, { accountId }) => {
				updateBlockState(response);
				const relationshipQueryKey = createRelationshipQueryKey([
					accountId,
					accountId,
				]);

				queryClient.setQueryData<Patchwork.RelationShip[]>(
					relationshipQueryKey,
					old => {
						if (!old) return [response];
						return old.map(rel =>
							rel.id === accountId ? { ...rel, ...response } : rel,
						);
					},
				);
			},
		});

	const onMakeRelationship = () => {
		if (isProfile && props.specifyServerAccId) {
			mutate({
				accountId: props.specifyServerAccId,
				isFollowing: props.relationships
					? props.relationships[0]?.following ||
					  props.relationships[0]?.requested
					: false,
			});
		}
	};

	const onToggleBlock = () => {
		if (isProfile && props.specifyServerAccId) {
			toggleBlock({
				accountId: props.specifyServerAccId,
				toBlock: props.relationships
					? !props.relationships[0]?.blocking
					: false,
			});
		}
	};

	const displayFollowActionText = () => {
		if (isProfile) {
			if (props.relationships && props.relationships[0]?.blocking) {
				return 'UnBlock';
			} else if (props.relationships && props.relationships[0]?.following) {
				return 'Following';
			} else if (props.relationships && props.relationships[0]?.requested) {
				return 'Requested';
			}
			return 'Follow';
		}
	};

	const onPressPreview = (imageUrl: string) => {
		if (!imageUrl.includes('/original/missing.png')) {
			navigation.navigate('LocalImageViewer', {
				imageUrl: {
					url: imageUrl,
				},
			});
		}
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
			<View>
				{props.type == 'Profile' && !props.isOwnChannelFeed && (
					<View className="flex-row items-center justify-center">
						{renderChatIcon()}
						<Button
							variant="default"
							size="sm"
							className="bg-slate-100 dark:bg-white rounded-3xl px-6 mt-5"
							onPress={() => {
								if (props.relationships && props.relationships[0]?.blocking) {
									return onToggleBlock();
								}
								return onMakeRelationship();
							}}
						>
							{isPending || isBlockInProgress ? (
								<Flow size={25} color={customColor['patchwork-dark-900']} />
							) : (
								<ThemeText className="text-black" size={'fs_13'}>
									{displayFollowActionText()}
								</ThemeText>
							)}
						</Button>
						<View className="w-8 h-8 rounded-full items-center justify-center border-[1px] border-gray-600 ml-2 active:opacity-80 mt-5">
							<AccountShield account={props.profile} />
						</View>
					</View>
				)}
			</View>
		);
	};

	const renderChatIcon = () => {
		return (
			<Pressable
				className="w-8 h-8 rounded-full items-center justify-center border-[1px] border-gray-600 mr-2 active:opacity-80 mt-5"
				onPress={handleChatIconPress}
			>
				<MessageDotsIcon width={19} height={19} {...{ colorScheme }} />
			</Pressable>
		);
	};

	const handleChatIconPress = () => {
		if (props.type == 'Profile') {
			if (userConversation?.last_status) {
				//@ts-expect-error
				navigation.navigate('Conversations', {
					screen: 'ConversationDetail',
					params: {
						id: userConversation.last_status.id,
						isFromProfile: true,
					},
				});
			} else {
				//@ts-expect-error
				navigation.navigate('Conversations', {
					screen: 'InitiateNewConversation',
					params: {
						account: props.profile,
					},
				});
			}
		}
	};

	return (
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
					joinedDate={dayjs(props.channel.contact?.account?.created_at).format(
						'MMM YYYY',
					)}
					userBio={props.channel?.description}
					// showChannelFollowers
				/>
			) : (
				<View>
					<VerticalInfo
						hasRedMark
						accountName={
							props.profile?.display_name
								? props.profile?.display_name
								: props.profile?.username
						}
						username={props.profile?.acct}
						joinedDate={dayjs(props.profile?.created_at).format('MMM YYYY')}
						userBio={props.profile?.note}
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
						isMainChannel={props.isMainChannel}
						accountId={props.profile?.id}
					/>
					<Underline className="mb-2 mt-4" />
				</View>
			)}
		</View>
	);
};
export default CollapsibleFeedHeader;
