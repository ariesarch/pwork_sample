import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import {
	useCheckRelationships,
	useSpecificServerProfile,
} from '@/hooks/queries/profile.queries';
import BlockMenuOption from '@/components/atoms/feed/StatusMenu/BlockMenuOption/BlockMenuOption';
import ReportMenuOption from '@/components/atoms/feed/StatusMenu/ReportMenuOption/ReportMenuOption';
import { MenuOption } from 'react-native-popup-menu';
import {
	StatusBlockIcon,
	StatusReportIcon,
} from '@/util/svg/icon.status_actions';
import MenuOptionIcon from '@/components/atoms/feed/StatusMenu/MenuOptionIcon/MenuOptionIcon';
import ReportContentModal from '@/components/atoms/feed/StatusMenu/ReportMenuOption/ReportContentModal/ReportContentModal';
import { useActiveDomainStore } from '@/store/feed/activeDomain';
import { useBlockUnBlockUserMutation } from '@/hooks/queries/feed.queries';
import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { queryClient } from '@/App';
import Toast from 'react-native-toast-message';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

const AccountShieldMenuOptions = ({
	account,
	hideMenu,
	navigation,
}: {
	account: Patchwork.Account;
	hideMenu: () => void;
	navigation: any;
}) => {
	const { domain_name } = useActiveDomainStore();
	const accountId = account.id; // Use for query caching purpose //

	const [showModal, setShowModal] = useState(false);

	// ***** Get Specific Server Profile ***** //
	const { data: specificServerProfile } = useSpecificServerProfile({
		q: account.url as string,
		options: {
			enabled: !!account.url,
		},
	});
	// ***** Get Specific Server Profile ***** //

	// ***** Check Relationship To Other Accounts ***** //
	const { data: relationships } = useCheckRelationships({
		accountIds: [specificServerProfile?.accounts[0]?.id],
		options: {
			enabled: !!specificServerProfile?.accounts[0]?.id,
		},
	});
	// ***** Check Relationship To Other Accounts ***** //

	const { mutate, isPending } = useBlockUnBlockUserMutation({
		onSuccess: () => {
			navigation.goBack();
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
				account?.display_name ?? account.username
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
		mutate({
			accountId: specificServerProfile?.accounts[0]?.id,
			toBlock: true,
		});
	};

	const blockMenuDisabled =
		!specificServerProfile?.accounts[0]?.id || !relationships || isPending;

	return (
		<>
			<MenuOption
				onSelect={onMakeBlockUnBlockUser}
				disableTouchable={blockMenuDisabled}
			>
				<View className="flex-row items-center">
					<View className="w-9 h-9 items-center justify-center">
						{
							<StatusBlockIcon
								stroke={blockMenuDisabled ? '#9299A3' : '#FFFFFF'}
							/>
						}
					</View>
					{isPending ? (
						<Flow
							size={25}
							color={customColor['patchwork-light-900']}
							className="ml-1"
						/>
					) : (
						<ThemeText size={'fs_15'} className="font-SourceSans3_Medium ml-1">
							Block
						</ThemeText>
					)}
				</View>
				{/* {!isPending ? (
					<Flow
						size={25}
						color={customColor['patchwork-light-900']}
						className="ml-1"
					/>
				) : (
					<MenuOptionIcon
						icon={
							<StatusBlockIcon
								stroke={blockMenuDisabled ? '#9299A3' : '#FFFFFF'}
							/>
						}
						name="Block"
						disabled={blockMenuDisabled}
					/>
				)} */}
			</MenuOption>
			<MenuOption
				onSelect={() => {
					setShowModal(true);
				}}
			>
				<MenuOptionIcon icon={<StatusReportIcon />} name="Report" />
			</MenuOption>
			{showModal && (
				<ReportContentModal
					visible={showModal}
					onClose={() => {
						setShowModal(false);
						hideMenu();
					}}
					account={account}
				/>
			)}
		</>
	);
};

export default AccountShieldMenuOptions;
