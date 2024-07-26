import React from 'react';
import { View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { ProfileNameRedMark } from '@/util/svg/icon.profile';

type AccountNameProps = {
	name: string;
};

const AccountName = ({ name, ...props }: AccountNameProps & ViewProps) => {
	return (
		<View className='flex-row items-center' {...props}>
			<ThemeText className="font-bold text-[17px] mr-2">{name}</ThemeText>
			<ProfileNameRedMark />
		</View>
	);
};

export default AccountName;
