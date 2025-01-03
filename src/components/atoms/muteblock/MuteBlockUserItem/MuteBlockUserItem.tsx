import React, { memo, useMemo } from 'react';
import { Pressable } from 'react-native';
import { View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import FastImage from 'react-native-fast-image';
import { queryClient } from '@/App';
import { Button } from '@/components/atoms/common/Button/Button';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import VerticalInfo from '@/components/molecules/common/VerticalInfo/VerticalInfo';
import { useUserRelationshipMutation } from '@/hooks/mutations/profile.mutation';
import { useAuthStore } from '@/store/auth/authStore';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { RootStackParamList } from '@/types/navigation';
import customColor from '@/util/constant/color';
import { cn } from '@/util/helper/twutil';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import {
	useBlockUnBlockUserMutation,
	useMuteUnmuteUserMutation,
} from '@/hooks/queries/feed.queries';
import { PagedResponse } from '@/util/helper/timeline';
import { InfiniteData } from '@tanstack/react-query';
import { PaginatedResponse } from '@/types/queries/conversations.type';
import {
	updateBlockState,
	updateMuteState,
} from '@/util/cache/statusActions/muteblockCache';

type Props = { user: Pathchwork.MuteBlockUserAccount; type: 'block' | 'mute' };

const MuteBlockUserItem = ({ user, type }: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const { userInfo } = useAuthStore();

	const { mutate: toggleMute, isPending: isMuteInProgress } =
		useMuteUnmuteUserMutation({
			onSuccess: response => {
				updateMuteState(response);
			},
		});

	const { mutate: toggleBlock, isPending: isBlockInProgress } =
		useBlockUnBlockUserMutation({
			onSuccess: response => {
				updateBlockState(response);
			},
		});

	const onToggleMuteBtn = (item: Pathchwork.MuteBlockUserAccount) => {
		if (isMuteInProgress || isBlockInProgress) return;
		if (type === 'block') {
			return toggleBlock({
				accountId: item.id,
				toBlock: !!item.isUnBlockedNow,
			});
		}
		toggleMute({ accountId: item.id, toMute: !!item.isUnMutedNow });
	};

	return (
		<View>
			<Pressable
				className="flex-row px-3 py-3"
				onPress={() => {
					navigation.push('ProfileOther', {
						id: user.id,
					});
				}}
			>
				<View className="flex-1 flex-row mr-2">
					<Pressable onPress={() => {}}>
						<FastImage
							className={cn(
								'w-10 h-10 border-patchwork-grey-400 border rounded-full',
							)}
							source={{
								uri: user.avatar,
								priority: FastImage.priority.normal,
							}}
							resizeMode={FastImage.resizeMode.cover}
						/>
					</Pressable>
					<VerticalInfo
						hasRedMark
						accountName={user.display_name ? user.display_name : user.username}
						username={user.acct}
						joinedDate={dayjs(user.created_at).format('MMM YYYY')}
						userBio={''}
						acctNameTextStyle="text-[14px]"
					/>
				</View>
				<Button
					variant="default"
					size="sm"
					className="bg-slate-100 dark:bg-white rounded-3xl px-6"
					onPress={() => onToggleMuteBtn(user)}
				>
					{isMuteInProgress || isBlockInProgress ? (
						<Flow size={15} color={'#000'} />
					) : (
						<>
							{type === 'block' ? (
								<ThemeText className="text-black" size={'fs_13'}>
									{user.isUnBlockedNow ? 'Block' : 'UnBlock'}
								</ThemeText>
							) : (
								<ThemeText className="text-black" size={'fs_13'}>
									{user.isUnMutedNow ? 'Mute' : 'UnMute'}
								</ThemeText>
							)}
						</>
					)}
				</Button>
			</Pressable>
		</View>
	);
};

export default MuteBlockUserItem;
