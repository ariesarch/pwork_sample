import React from 'react';
import { View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { ProfileNameRedMark } from '@/util/svg/icon.profile';

type AccountNameProps = {
	accountName: string;
	acctNameTextStyle?: string;
	hasRedMark?: boolean;
};

const AccountName = ({
	accountName,
	acctNameTextStyle,
	hasRedMark,
	...props
}: AccountNameProps & ViewProps) => {
	return (
		<View className="flex-row items-start" {...props}>
			<ThemeText className={`font-bold text-[17px] mr-2 mb-1 ${acctNameTextStyle}`}>
				{accountName}
			</ThemeText>
			{hasRedMark && <ProfileNameRedMark />}
		</View>
	);
};

export default AccountName;
