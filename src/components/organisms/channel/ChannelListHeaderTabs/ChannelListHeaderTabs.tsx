import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Underline from '@/components/atoms/common/Underline/Underline';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import HorizontalScrollMenu from '../HorizontalScrollMenu/HorizontalScrollMenu';
import ChannelAbout from '../ChannelAbout/ChannelAbout';

type Props = {
	activeTab: number;
	handleOnPressTab: (i: number) => void;
	channelAbout: Patchwork.ChannelAbout;
};
const ChannelListHeaderTabs = ({
	activeTab,
	handleOnPressTab,
	channelAbout,
}: Props) => {
	return (
		<View className=" bg-patchwork-light-900 dark:bg-patchwork-dark-100">
			<View className="flex-1 flex-row bg-patchwork-light-900 dark:bg-patchwork-dark-100">
				{['Posts', 'About'].map((tab, index) => (
					<View className="flex-1" key={index}>
						<TouchableOpacity
							key={`option-${index}`}
							className="flex-1 items-center justify-center h-[34]"
							onPress={() => handleOnPressTab(index)}
						>
							<ThemeText
								size="md_16"
								variant={activeTab === index ? 'default' : 'textGrey'}
								className="font-semibold"
							>
								{tab}
							</ThemeText>
							{activeTab === index && (
								<View className="absolute top-5 h-[2] w-4/5 mt-3 rounded-lg bg-patchwork-dark-100 dark:bg-patchwork-light-900" />
							)}
						</TouchableOpacity>
					</View>
				))}
			</View>
			{activeTab === 1 && <Underline className="mt-1" />}
			{activeTab === 0 ? (
				<HorizontalScrollMenu />
			) : (
				<ChannelAbout channelAbout={channelAbout} />
			)}
		</View>
	);
};

export default memo<Props>(ChannelListHeaderTabs);
