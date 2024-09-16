import React from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Underline from '@/components/atoms/common/Underline/Underline';

type Props = {
	channelAbout: Pathchwork.ChannelAbout | undefined;
};
const ChannelGuidelines = ({ channelAbout }: Props) => {
	return (
		<>
			<View className="p-4">
				<ThemeText className="font-bold">Channel guidelines</ThemeText>
				<View>
					{channelAbout?.rules &&
						channelAbout.rules.map((item, idx) => {
							return (
								<View className="flex-row items-center my-2" key={idx}>
									<View className="w-[30] h-[30] items-center justify-center bg-patchwork-red-50 rounded-full mr-2">
										<ThemeText className="font-semibold text-patchwork-dark-100">
											{idx + 1}
										</ThemeText>
									</View>
									<ThemeText>{item.text}</ThemeText>
								</View>
							);
						})}
				</View>
			</View>
			<Underline />
		</>
	);
};

export default ChannelGuidelines;
