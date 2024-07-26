import React from 'react';
import { View } from 'react-native';
import AccountName from '@/components/atoms/profile/AccountName';
import Bio from '@/components/atoms/profile/Bio';
import UserName from '@/components/atoms/profile/UserName';
import ChannelFollowers from '../../channel/ChannelFollowers/ChannelFollowers';

type VerticalInfoProps = {
	accountName: string;
	username: string;
	joinedDate: string;
	profileInfo: string;
	hasRedMark?: boolean;
};

const VerticalInfo = ({
	accountName,
	username,
	joinedDate,
	profileInfo,
	hasRedMark,
}: VerticalInfoProps) => {
	return (
		<View className="flex-col px-4 pt-4">
			<AccountName name={accountName} {...{ hasRedMark }} />
			<UserName username={username} joinedDate={joinedDate} />
			<ChannelFollowers followers={'7.3k'} />
			<Bio info={profileInfo} />
		</View>
	);
};

export default VerticalInfo;
