import React from 'react';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { ViewProps } from 'react-native';
import { CaretRightIcon } from '@/util/svg/icon.common';

type UserNameProps = {
	username: string;
	joinedDate: string;
};

const UsernameName = ({ username, joinedDate, ...props }: UserNameProps & ViewProps) => {
	return (
		<ThemeText className="opacity-50 text-xs" {...props}>
			@{username} <CaretRightIcon /> Joined on {joinedDate}
		</ThemeText>
	);
};

export default UsernameName;
