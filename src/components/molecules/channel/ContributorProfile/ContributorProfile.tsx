import { View, Text } from 'react-native';
import React from 'react';
import Image from '@/components/atoms/common/Image/Image';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

type Props = {
	account: Pathchwork.Account;
};
const ContributorProfile = ({ account }: Props) => {
	return (
		<View className="flex-row">
			<View className="items-center">
				<View className="bg-black p-[2] border border-slate-200 items-start rounded-full">
					<Image uri={account.avatar} className="w-[80] h-[80] rounded-full" />
				</View>
				<ThemeText className="font-semibold mt-2">{account.username}</ThemeText>
				<ThemeText variant={'textGrey'} size="fs_13">
					{account.acct}
				</ThemeText>
			</View>
		</View>
	);
};

export default ContributorProfile;
