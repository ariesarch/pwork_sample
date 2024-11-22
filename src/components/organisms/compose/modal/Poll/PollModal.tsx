import React, { useState } from 'react';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { MenuItem } from 'react-native-material-menu';
import PollDuration from './PollDuration/PollDuration';
import { Button } from '@/components/atoms/common/Button/Button';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ComposeTextInput from '@/components/atoms/compose/ComposeTextInput/ComposeTextInput';
import { useGradualAnimation } from '@/hooks/custom/useGradualAnimation';
import { usePollStore } from '@/store/compose/poll/pollStore';
import { DeletePollOptionIcon } from '@/util/svg/icon.compose';

interface PollModalProps {
	visible: boolean;
	onClose: () => void;
}

const durations = ['7 days', '3 days', '1 day', '6 hours', '1 hour'];

const PollModal = ({ visible, onClose }: PollModalProps) => {
	const [durationMenuVisible, setDurationMenuVisible] = useState(false);
	const hideMenu = () => setDurationMenuVisible(false);
	const showMenu = () => setDurationMenuVisible(true);

	const options = usePollStore(state => state.options);
	const addOption = usePollStore(state => state.addOption);
	const updateOption = usePollStore(state => state.updateOption);
	const deleteOption = usePollStore(state => state.deleteOption);
	const setPollCreate = usePollStore(state => state.setPollCreate);

	const duration = usePollStore(state => state.duration);
	const setDuration = usePollStore(state => state.setDuration);

	const { height } = useGradualAnimation();

	const pollDurationAnimatedViewStyle = useAnimatedStyle(() => {
		return {
			height: Math.abs(height.value),
		};
	});

	return (
		<ThemeModal
			isFlex
			openThemeModal={visible}
			parentPaddingEnabled={false}
			containerStyle={{ borderRadius: 24 }}
		>
			<View className="flex-1 pt-2">
				<View className="flex-row items-center justify-between px-5">
					<Pressable onPress={onClose}>
						<ThemeText>Cancel</ThemeText>
					</Pressable>
					<Pressable
						onPress={() => {
							onClose();
							setPollCreate(true);
						}}
					>
						<ThemeText variant={'textOrange'}>Create</ThemeText>
					</Pressable>
				</View>

				{/* Poll Body */}
				<View className="flex-1 px-5">
					<View className="mt-3">
						{/* Poll Options */}
						<FlatList
							data={options}
							keyExtractor={item => item.id.toString()}
							keyboardShouldPersistTaps={'always'}
							renderItem={({ item, index }) => (
								<View className="flex-row items-center mb-3">
									<TextInput
										styleNW="w-10/12"
										placeholder={`Option ${item.id}`}
										value={item.text}
										onChangeText={text => updateOption(item.id, text)}
										endIcon={
											<ThemeText variant={'textOrange'}>
												{item.textLength}
											</ThemeText>
										}
									/>
									{index > 1 && (
										<TouchableOpacity
											className={'ml-5'}
											onPress={() => deleteOption(item.id)}
										>
											<DeletePollOptionIcon />
										</TouchableOpacity>
									)}
								</View>
							)}
							ListHeaderComponent={
								<>
									<ThemeText size={'xl_20'} className="font-semibold">
										Create a Poll
									</ThemeText>
									<ComposeTextInput
										placeholder="Ask a question"
										className="px-0"
									/>
								</>
							}
							ListFooterComponent={
								<View className="items-start mb-2">
									<Button
										variant="outline"
										className="rounded-2xl"
										size="sm"
										disabled={options.length > 3}
										onPress={() => addOption('')}
									>
										<ThemeText size="xs_12" className="text-center">
											Add Option
										</ThemeText>
									</Button>
								</View>
							}
						/>
					</View>
				</View>

				{/* Poll Body */}
				<View className="w-full flex-row items-center justify-between px-5 py-3 bg-patchwork-dark-400">
					<ThemeText>Poll Duration</ThemeText>
					<PollDuration
						durationMenuVisible={durationMenuVisible}
						showMenu={showMenu}
						hideMenu={hideMenu}
						duration={duration}
						children={
							<>
								{durations.map((item, index) => (
									<MenuItem
										key={index}
										onPress={() => {
											setDuration(item);
											hideMenu();
										}}
										className="bg-patchwork-dark-50"
									>
										<ThemeText>{item}</ThemeText>
									</MenuItem>
								))}
							</>
						}
					/>
				</View>
				<Animated.View style={pollDurationAnimatedViewStyle} />
			</View>
		</ThemeModal>
	);
};

export default PollModal;
