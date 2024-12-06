import React from 'react';
import { View, Pressable } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { ComposePlusIcon } from '@/util/svg/icon.compose';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';

const LongPostAction = () => {
	const { composeState, composeDispatch } = useComposeStatus();

	return (
		<>
			{composeState?.maxCount === 500 ? (
				<View className="flex-1 items-end">
					<View className="flex-row items-center">
						{/* {composeState.text.count !== 500 && (
							<ThemeText className="mr-3 text-white">
								{composeState.text.count ? 500 - composeState.text.count : 500}
							</ThemeText>
						)} */}
						<Pressable
							className="flex-row items-center"
							onPress={() =>
								composeDispatch({ type: 'maxCount', payload: 4000 })
							}
						>
							<ComposePlusIcon />
							<ThemeText className="ml-2 text-white">Long Post</ThemeText>
						</Pressable>
					</View>
				</View>
			) : (
				<View className="flex-1 items-end">
					<Pressable
						className="flex-row items-center"
						onPress={() => {
							if (composeState.text.count > 500) {
								composeDispatch({
									type: 'text',
									payload: {
										count: 500,
										raw: composeState.text.raw.slice(0, 500),
									},
								});
							}
							composeDispatch({
								type: 'maxCount',
								payload: 500,
							});
						}}
					>
						<ThemeText className="ml-2 text-white">
							{composeState.maxCount - composeState.text.count <= 0
								? 'Too many characters'
								: composeState.maxCount - composeState.text.count}
						</ThemeText>
					</Pressable>
				</View>
			)}
		</>
	);
};

export default LongPostAction;
