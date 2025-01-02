import React, { useMemo } from 'react';
import { View } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import { StatusFollowIcon } from '@/util/svg/icon.status_actions';
import {
	useCheckRelationships,
	useSpecificServerProfile,
} from '@/hooks/queries/profile.queries';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useUserRelationshipMutation } from '@/hooks/mutations/profile.mutation';
import { CheckRelationshipQueryKey } from '@/types/queries/profile.type';
import { queryClient } from '@/App';

const FollowMenuOption = ({
	accountId,
	relationships,
}: {
	accountId: Pathchwork.Account['id'];
	relationships: Pathchwork.RelationShip[];
}) => {
	const { mutate, isPending } = useUserRelationshipMutation({
		onSuccess: (newRelationship, { accountId }) => {
			const relationshipQueryKey: CheckRelationshipQueryKey = [
				'check-relationship-to-other-accounts',
				{ accountIds: [accountId] },
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
			accountId: accountId,
			isFollowing: relationships
				? relationships[0]?.following || relationships[0]?.requested
				: false,
		});
	};

	const displayRelationshipText = useMemo(() => {
		if (relationships && relationships[0]?.following) return 'Following';
		if (relationships && relationships[0]?.requested) return 'Requested';
		return 'Follow';
	}, [relationships && relationships[0]]);

	const followMenuLoading = !accountId || !relationships || isPending;

	return (
		<MenuOption onSelect={onMakeRelationship} disabled={followMenuLoading}>
			<View className="flex-row items-center">
				<View className="w-9 h-9 items-center justify-center">
					{<StatusFollowIcon />}
				</View>
				{followMenuLoading ? (
					<Flow
						size={25}
						color={customColor['patchwork-light-900']}
						className="ml-1"
					/>
				) : (
					<ThemeText size={'fs_15'} className="font-SourceSans3_Medium ml-1">
						{displayRelationshipText}
					</ThemeText>
				)}
			</View>
		</MenuOption>
	);
};

export default FollowMenuOption;
