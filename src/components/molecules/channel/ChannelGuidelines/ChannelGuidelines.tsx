import React from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import Underline from '@/components/atoms/common/Underline/Underline';

const ChannelGuidelines = () => {
	return (
		<>
			<View className="p-4">
				<ThemeText className="font-bold">Channel guidelines</ThemeText>
				<View>
					<View className="flex-row items-center my-2">
						<View className="w-[30] h-[30] items-center justify-center bg-patchwork-red-50 rounded-full mr-2">
							<ThemeText className="font-semibold text-patchwork-dark-100">
								1
							</ThemeText>
						</View>
						<ThemeText>Ensure all posts are on topic</ThemeText>
					</View>
					<View className="flex-row items-center my-2">
						<View className="w-[30] h-[30] items-center justify-center bg-patchwork-red-50 rounded-full mr-2">
							<ThemeText className="font-semibold text-patchwork-dark-100">
								2
							</ThemeText>
						</View>
						<ThemeText>
							Be kind and respectful in your posts and replies
						</ThemeText>
					</View>
					<View className="flex-row items-center mt-2">
						<View className="w-[30] h-[30] items-center justify-center bg-patchwork-red-50 rounded-full mr-2">
							<ThemeText className="font-semibold text-patchwork-dark-100">
								3
							</ThemeText>
						</View>
						<ThemeText>Explore and share </ThemeText>
					</View>
				</View>
			</View>
			<Underline />
		</>
	);
};

export default ChannelGuidelines;
