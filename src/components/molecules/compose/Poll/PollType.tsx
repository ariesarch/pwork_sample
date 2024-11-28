import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { POLL_TYPES } from '@/util/constant/pollOption';
import { PollDropperIcon } from '@/util/svg/icon.compose';

type PollTypeProps = {
	selectedType: boolean;
	handleTypeChange: (value: boolean) => void;
};

const PollType = ({ selectedType, handleTypeChange }: PollTypeProps) => {
	const [choiceMenuVisible, setChoiceMenuVisible] = useState(false);
	const hideMenu = () => setChoiceMenuVisible(false);
	const showMenu = () => setChoiceMenuVisible(true);

	return (
		<View>
			<Menu
				visible={choiceMenuVisible}
				anchor={
					<Pressable
						onPress={showMenu}
						style={{ flexDirection: 'row', alignItems: 'center' }}
					>
						<ThemeText className="mr-1">
							{POLL_TYPES.find(opt => opt.value === selectedType)?.label}
						</ThemeText>
						<PollDropperIcon stroke={'#FFFFFF'} />
					</Pressable>
				}
				style={{ marginTop: 50, borderRadius: 10, overflow: 'hidden' }}
				onRequestClose={hideMenu}
			>
				{POLL_TYPES.map((type, index) => (
					<MenuItem
						key={index}
						onPress={() => {
							handleTypeChange(type.value);
							hideMenu();
						}}
						className="bg-patchwork-dark-50"
					>
						<ThemeText>{type.label}</ThemeText>
					</MenuItem>
				))}
			</Menu>
		</View>
	);
};

export default PollType;
