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
	showChannel?: boolean;
};

const VerticalInfo = ({
	accountName,
	username,
	joinedDate,
	profileInfo,
	hasRedMark = false,
	showChannel = true,
}: VerticalInfoProps) => {
	return (
		<View className="flex-col px-4 pt-4">
			<AccountName name={accountName} {...{ hasRedMark }} />
			<UserName username={username} joinedDate={joinedDate} />
			{showChannel && <ChannelFollowers followers="7.3k" />}
			<View className="flex-row">
				<Bio info={profileInfo} />
			</View>
		</View>
	);
};

export default VerticalInfo;
