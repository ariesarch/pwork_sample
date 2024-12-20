import React from 'react';
import { View } from 'react-native';
import AccountName from '@/components/atoms/profile/AccountName';
import Bio from '@/components/atoms/profile/Bio';
import UserName from '@/components/atoms/profile/UserName';
import ChannelFollowers from '../../channel/ChannelFollowers/ChannelFollowers';

type VerticalInfoProps = {
	accountName: string;
	username: string;
	joinedDate?: string;
	userBio: string;
	userBioTextStyle?: string;
	hasRedMark?: boolean;
	showChannelFollowers?: boolean;
	acctNameTextStyle?: string;
};

const VerticalInfo = ({
	accountName,
	username,
	joinedDate,
	userBio,
	userBioTextStyle,
	hasRedMark,
	acctNameTextStyle,
	showChannelFollowers,
}: VerticalInfoProps) => {
	return (
		<View className="flex-1 flex-col px-4">
			<AccountName {...{ accountName, acctNameTextStyle, hasRedMark }} />
			<UserName {...{ username, joinedDate }} />
			{showChannelFollowers && <ChannelFollowers followers="7.3k" />}
			{userBio && <Bio {...{ userBio, userBioTextStyle }} />}
		</View>
	);
};

export default VerticalInfo;
