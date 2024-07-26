import {
	Avatar,
	AccountName,
	UserName,
	ProfileInformation,
} from '@/components/atoms';
import Underline from '@/components/atoms/common/Underline/Underline';
import React from 'react';
import { View } from 'react-native';

type HorizontalInfoProps = {
	avatarSrc: string;
	accountName: string;
	username: string;
	joinedDate: string;
	profileInfo: string;
};

const HorizontalInfo = ({
	avatarSrc,
	accountName,
	username,
	joinedDate,
	profileInfo,
}: HorizontalInfoProps) => {
	return (
        <View>
		<View className="flex flex-row mb-2 mt-2">
			<Avatar
				src={avatarSrc}
				className="-mt-1  rounded-full w-20 h-20 border-patchwork-dark-100 border-[2.56px] "
			/>
			<View className="flex-col px-4">
				<AccountName name={accountName} />
				<UserName username={username} joinedDate={joinedDate} />
				<ProfileInformation info={profileInfo} />
			</View>
		</View>
        <Underline className='mt-2'/>
        </View>
	);
};

export default HorizontalInfo;
