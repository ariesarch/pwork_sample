import React from 'react';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { ViewProps } from 'react-native';
import { CaretRightIcon } from '@/util/svg/icon.common';

type UserNameProps = {
	username: string;
	joinedDate: string;
};

const UserName = ({ username, joinedDate, ...props }: UserNameProps & ViewProps) => {
	return (
		<ThemeText size={'xs_12'} variant={'textGrey'}>
			@{username} <CaretRightIcon /> {joinedDate}
		</ThemeText>
	);
};

export default UserName;
