import React from 'react';
import { Platform } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import MenuOptionIcon from '../MenuOptionIcon/MenuOptionIcon';
import { StatusBlockIcon } from '@/util/svg/icon.status_actions';
import { useBlockUnBlockUserMutation } from '@/hooks/mutations/feed.mutation';
import { queryClient } from '@/App';
import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { useActiveDomainStore } from '@/store/feed/activeDomain';
import Toast from 'react-native-toast-message';

const BlockMenuOption = ({
	status,
	specifyServerAccId, // Use for mutation //
	relationships,
	hideMenu,
}: {
	status: Patchwork.Status;
	specifyServerAccId: Patchwork.Account['id'];
	relationships: Patchwork.RelationShip[];
	hideMenu: () => void;
}) => {
	const { domain_name } = useActiveDomainStore();
	const accountId = status.account.id; // Use for query caching purpose //

	const { mutate, isPending } = useBlockUnBlockUserMutation({
		onSuccess: () => {
			const channelFeedQueryKey: GetChannelFeedQueryKey = [
				'channel-feed',
				{ domain_name, remote: false, only_media: false },
			];
			queryClient.setQueryData<IFeedQueryFnData>(channelFeedQueryKey, old => {
				if (!old) return old;
				return {
					...old,
					pages: old.pages.map(page => ({
						...page,
						data: page.data.filter(status => status.account?.id !== accountId),
					})),
				};
			});

			const actionText = `${
				status?.account?.display_name ?? status.account.username
			} has been blocked`;

			Toast.show({
				type: 'success',
				text1: actionText,
				position: 'top',
				topOffset: Platform.OS === 'ios' ? 80 : 50,
			});
			hideMenu();
		},
	});

	const onMakeBlockUnBlockUser = () => {
		mutate({ accountId: specifyServerAccId, toBlock: true });
	};

	const blockMenuDisabled = !specifyServerAccId || !relationships || isPending;

	return (
		<MenuOption
			onSelect={onMakeBlockUnBlockUser}
			disableTouchable={blockMenuDisabled}
		>
			<MenuOptionIcon
				icon={
					<StatusBlockIcon stroke={blockMenuDisabled ? '#9299A3' : '#FFFFFF'} />
				}
				name="Block"
				disabled={blockMenuDisabled}
			/>
		</MenuOption>
	);
};

export default BlockMenuOption;
