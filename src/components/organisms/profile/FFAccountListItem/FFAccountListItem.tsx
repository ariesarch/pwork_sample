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
import {
	AccountInfoQueryKey,
	CheckRelationshipQueryKey,
} from '@/types/queries/profile.type';
import customColor from '@/util/constant/color';
import { cn } from '@/util/helper/twutil';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';

interface IAccountFollowingQueryFnData {
	pageParams: unknown[];
	pages: Array<{
		data: Pathchwork.Account[];
	}>;
}
const FFAccountListItem = ({
	item,
	relationship,
	isLoadingRelationships,
	isMainChannel,
	followerIds,
}: {
	item: Pathchwork.Account;
	relationship: Pathchwork.RelationShip | undefined;
	isLoadingRelationships: boolean;
	isMainChannel: boolean | undefined;
	followerIds: string[];
}) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const { userInfo } = useAuthStore();
	const domain_name = useSelectedDomain();

	const isAuthor = useMemo(() => {
		const currentUserAccHandle = userInfo?.acct + '@channel.org';
		return userInfo?.id == item.id || item.acct == currentUserAccHandle;
	}, [item, userInfo?.id]);

	const onPressPreview = (imageUrl: string) => {
		navigation.navigate('LocalImageViewer', {
			imageUrl: {
				url: imageUrl,
			},
		});
	};

	const { mutate, isPending } = useUserRelationshipMutation({
		onSuccess: (newRelationship, { accountId }) => {
			// Make Query cache later //
			const acctInfoQueryKey: AccountInfoQueryKey = [
				'get_account_info',
				{
					id: item.id,
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
			// Make Query cache later //

			const relationshipQueryKey: CheckRelationshipQueryKey = [
				'check-relationship-to-other-accounts',
				{ accountIds: followerIds },
			];

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
		mutate({
			accountId: item.id,
			isFollowing: relationship
				? relationship?.following || relationship?.requested
				: false,
		});
	};

	const displayRelationshipText = useMemo(() => {
		if (relationship?.following) return 'Following';
		if (relationship?.requested) return 'Requested';
		return 'Follow';
	}, [relationship]);

	return (
		<View>
			<Pressable
				className="flex-row px-3 py-3"
				onPress={() => {
					navigation.push('ProfileOther', {
						id: item.id,
						isFromNoti: isMainChannel,
					});
				}}
			>
				<View className="flex-1 flex-row mr-2">
					<Pressable onPress={() => onPressPreview(item.avatar)}>
						<FastImage
							className={cn(
								'w-10 h-10 border-patchwork-grey-400 border rounded-full',
							)}
							source={{
								uri: item.avatar,
								priority: FastImage.priority.normal,
							}}
							resizeMode={FastImage.resizeMode.cover}
						/>
					</Pressable>
					<VerticalInfo
						hasRedMark
						accountName={item.display_name ? item.display_name : item.username}
						username={item.acct}
						joinedDate={dayjs(item.created_at).format('MMM YYYY')}
						userBio={''}
					/>
				</View>
				{!isAuthor && (
					<Button
						variant="default"
						size="sm"
						className="bg-slate-100 dark:bg-white rounded-3xl px-6"
						onPress={onMakeRelationship}
						disabled={isLoadingRelationships || isPending}
					>
						{isLoadingRelationships || isPending ? (
							<Flow size={25} color={customColor['patchwork-dark-900']} />
						) : (
							<ThemeText className="text-black" size={'fs_13'}>
								{displayRelationshipText}
							</ThemeText>
						)}
					</Button>
				)}
			</Pressable>
		</View>
	);
};

export default memo(FFAccountListItem);
