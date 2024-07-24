import React from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { ProfileNameRedMark } from '@/util/svg/icon.profile';

type AccountNameProps = {
	name: string;
};

const AccountName = ({ name }: AccountNameProps) => {
	return (
		<View className='flex-row items-center mt-2'>
			<ThemeText className="font-bold text-[17px] mr-2">{name}</ThemeText>
			<ProfileNameRedMark />
		</View>
	);
};

export default AccountName;
