import React from 'react';
import { Pressable } from 'react-native';
import { Menu } from 'react-native-material-menu';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { PollDropperIcon } from '@/util/svg/icon.compose';

type PollDurationProps = {
	durationMenuVisible: boolean;
	showMenu: () => void;
	hideMenu: () => void;
	duration: string;
	children: React.ReactNode;
};
const PollDuration = ({
	durationMenuVisible,
	showMenu,
	hideMenu,
	duration,
	children,
}: PollDurationProps) => {
	return (
		<Menu
			visible={durationMenuVisible}
			style={{
				marginTop: -30,
				borderRadius: 12,
				overflow: 'hidden',
			}}
			anchor={
				<Pressable
					onPress={showMenu}
					style={{ flexDirection: 'row', alignItems: 'center' }}
				>
					<ThemeText size={'xs_12'} variant={'textOrange'}>
						{duration}
					</ThemeText>
					<PollDropperIcon />
				</Pressable>
			}
			onRequestClose={hideMenu}
		>
			{children}
		</Menu>
	);
};

export default PollDuration;
