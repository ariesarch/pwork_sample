import React from 'react';
import { View, Text } from 'react-native';
import FollowMenuOption from '../FollowMenuOption/FollowMenuOption';
import MuteMenuOption from '../MuteMenuOption/MuteMenuOption';
import {
	useCheckRelationships,
	useSpecificServerProfile,
} from '@/hooks/queries/profile.queries';
import ReportMenuOption from '../ReportMenuOption/ReportMenuOption';
import BlockMenuOption from '../BlockMenuOption/BlockMenuOption';

const MenuOptionsForOtherUser = ({
	status,
	hideMenu,
}: {
	status: Patchwork.Status;
	hideMenu: () => void;
}) => {
	// ***** Get Specific Server Profile ***** //
	const { data: specificServerProfile } = useSpecificServerProfile({
		q: status.account.url as string,
		options: {
			enabled: !!status.account.url,
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

	return (
		<>
			<FollowMenuOption
				accountId={specificServerProfile?.accounts[0]?.id}
				relationships={relationships}
			/>
			<MuteMenuOption
				status={status}
				specifyServerAccId={specificServerProfile?.accounts[0]?.id}
				relationships={relationships}
				hideMenu={hideMenu}
			/>
			<BlockMenuOption
				status={status}
				specifyServerAccId={specificServerProfile?.accounts[0]?.id}
				relationships={relationships}
				hideMenu={hideMenu}
			/>
			<ReportMenuOption hideMenu={hideMenu} status={status} />
		</>
	);
};

export default MenuOptionsForOtherUser;
