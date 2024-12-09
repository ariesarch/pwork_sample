import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { POLL_TYPES } from '@/util/constant/pollOption';
import { PollDropperIcon } from '@/util/svg/icon.compose';
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
	renderers,
} from 'react-native-popup-menu';
import Underline from '@/components/atoms/common/Underline/Underline';
import customColor from '@/util/constant/color';

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
				renderer={renderers.Popover}
				rendererProps={{
					placement: 'top',
					anchorStyle: {
						width: 0,
						height: 0,
					},
				}}
				opened={choiceMenuVisible}
				style={{ zIndex: 1000 }}
				onBackdropPress={hideMenu}
			>
				<MenuTrigger>
					<Pressable
						onPress={showMenu}
						style={{ flexDirection: 'row', alignItems: 'center' }}
					>
						<ThemeText className="mr-1">
							{POLL_TYPES.find(opt => opt.value === selectedType)?.label}
						</ThemeText>
						<PollDropperIcon stroke={'#FFFFFF'} />
					</Pressable>
				</MenuTrigger>
				<MenuOptions
					customStyles={{
						optionsContainer: {
							backgroundColor: customColor['patchwork-dark-50'],
							borderRadius: 3,
							shadowOpacity: 0.1,
							elevation: 2,
						},
					}}
				>
					<>
						{POLL_TYPES.map((type, index) => (
							<MenuOption
								onSelect={() => {
									handleTypeChange(type.value);
									hideMenu();
								}}
								key={index}
								style={{
									paddingHorizontal: 15,
									paddingVertical: 10,
									borderRadius: 3,
								}}
							>
								<ThemeText>{type.label}</ThemeText>
							</MenuOption>
						))}
					</>
				</MenuOptions>
			</Menu>
		</View>
	);
};

export default PollType;
