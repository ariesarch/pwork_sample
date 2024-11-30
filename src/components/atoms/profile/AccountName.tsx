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
		<View className="flex-row items-center" {...props}>
			<ThemeText
				className={`font-SourceSans3_Bold text-[17px] mr-2 leading-6 ${acctNameTextStyle}`}
			>
				{accountName}
			</ThemeText>
			{hasRedMark && <ProfileNameRedMark />}
		</View>
	);
};

export default AccountName;
