import {
	Avatar,
	AccountName,
	UserName,
	ProfileInformation,
} from '@/components/atoms';
import React from 'react';
import { View } from 'react-native';

type VerticalInfoProps = {
	avatarSrc: string;
	accountName: string;
	username: string;
	joinedDate: string;
	profileInfo: string;
};

const VerticalInfo = ({
	avatarSrc,
	accountName,
	username,
	joinedDate,
	profileInfo,
}: VerticalInfoProps) => {
	return (
		<View className="flex-col px-4">
			<Avatar
				src={avatarSrc}
				className="-mt-10 rounded-full w-20 h-20 border-patchwork-dark-100 border-[2.56px]"
			/>
			<AccountName name={accountName} />
			<UserName username={username} joinedDate={joinedDate} />
			<ProfileInformation info={profileInfo} />
		</View>
	);
};

export default VerticalInfo;
