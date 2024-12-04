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
				<ThemeText className="font-SourceSans3_Bold" size={'fs_15'}>
					Channel guidelines
				</ThemeText>
				<View>
					{channelAbout?.rules &&
						channelAbout.rules.map((item, idx) => {
							return (
								<View className="flex-row items-center my-2" key={idx}>
									<View className="w-[30] h-[30] items-center justify-center bg-patchwork-red-50 rounded-full mr-2">
										<ThemeText className="font-SourceSans3_SemiBold text-white">
											{idx + 1}
										</ThemeText>
									</View>
									<ThemeText className="flex-1">{item.text}</ThemeText>
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
