import React from 'react';
import { View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { ProfileNameRedMark } from '@/util/svg/icon.profile';

type AccountNameProps = {
	name: string;
	hasRedMark?: boolean;
};

const AccountName = ({
	name,
	hasRedMark,
	...props
}: AccountNameProps & ViewProps) => {
	return (
		<View className="flex-row items-center" {...props}>
			<ThemeText className="font-bold text-[17px] mr-2">{name}</ThemeText>
			{hasRedMark && <ProfileNameRedMark />}
		</View>
	);
};

export default AccountName;
