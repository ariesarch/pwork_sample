import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { PollDropperIcon } from '@/util/svg/icon.compose';
import { POLL_DURATION_OPTIONS } from '@/util/constant/pollOption';
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
	renderers,
} from 'react-native-popup-menu';
import customColor from '@/util/constant/color';

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
	console.log('bb::');

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
				opened={durationMenuVisible}
				style={{ zIndex: 1000 }}
				onBackdropPress={hideMenu}
			>
				<MenuTrigger>
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
				</MenuTrigger>
				<MenuOptions
					customStyles={{
						optionsContainer: {
							backgroundColor: customColor['patchwork-dark-50'],
							borderRadius: 3,
						},
					}}
				>
					<>
						{POLL_DURATION_OPTIONS.map((option, index) => (
							<MenuOption
								onSelect={() => {
									handleDurationSelect(option.value);
									hideMenu();
								}}
								key={index}
								style={{
									paddingVertical: 10,
									paddingHorizontal: 15,
									borderRadius: 3,
								}}
							>
								<ThemeText>{option.label}</ThemeText>
							</MenuOption>
						))}
					</>
				</MenuOptions>
			</Menu>
		</View>
	);
};

export default PollDuration;
