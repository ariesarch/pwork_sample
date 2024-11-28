import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { PollDropperIcon } from '@/util/svg/icon.compose';
import { POLL_DURATION_OPTIONS } from '@/util/constant/pollOption';

type PollDurationProps = {
	selectedDuration: number;
	handleDurationSelect: (duration: number) => void;
};

const PollDuration = ({
	selectedDuration,
	handleDurationSelect,
}: PollDurationProps) => {
	const [durationMenuVisible, setDurationMenuVisible] = useState(false);
	const hideMenu = () => setDurationMenuVisible(false);
	const showMenu = () => setDurationMenuVisible(true);

	return (
		<View>
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
						<ThemeText variant={'textOrange'} className="mr-1">
							{
								POLL_DURATION_OPTIONS.find(
									opt => opt.value === selectedDuration,
								)?.label
							}
						</ThemeText>
						<PollDropperIcon />
					</Pressable>
				}
				onRequestClose={hideMenu}
			>
				{POLL_DURATION_OPTIONS.map((option, index) => (
					<MenuItem
						key={index}
						onPress={() => {
							handleDurationSelect(option.value);
							hideMenu();
						}}
						className="bg-patchwork-dark-50"
					>
						<ThemeText>{option.label}</ThemeText>
					</MenuItem>
				))}
			</Menu>
		</View>
	);
};

export default PollDuration;
