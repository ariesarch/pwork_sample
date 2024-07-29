import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { SectionListWithHeaders } from '@codeherence/react-native-header';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { statusListData } from '@/mock/feed/statusList';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import Underline from '@/components/atoms/common/Underline/Underline';
import CommonHeader from '@/components/molecules/common/CommonHeader/CommonHeader';
import HorizontalScrollMenu from '@/components/organisms/channel/HorizontalScrollMenu/HorizontalScrollMenu';
import ChannelAbout from '@/components/organisms/channel/ChannelAbout/ChannelAbout';
import ChannelHeaderInfo from '@/components/organisms/channel/ChannelHeaderInfo/ChannelHeaderInfo';
import TabBar from '@/components/molecules/common/TabBar/TabBar';

const ChannelTemplate = () => {
	const { colorScheme } = useColorScheme();
	const { bottom } = useSafeAreaInsets();
	const [activeTab, setActiveTab] = useState(0);

	return (
		<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
			<SectionListWithHeaders
				HeaderComponent={({ scrollY, showNavBar }) => (
					<CommonHeader
						scrollY={scrollY}
						showNavBar={showNavBar}
						bannerSrc={require('../../../../assets/images/mock/channel/channel_banner.png')}
						imageSrc={require('../../../../assets/images/mock/channel/channel_banner.png')}
            avatarStyle='rounded-md -top-4 w-20 h-20 border-patchwork-dark-100 border-[2.56px]'
            fadingName='Channel name'
					/>
				)}
				LargeHeaderComponent={ChannelHeaderInfo}
				sections={statusListData}
				disableAutoFixScroll
				ignoreLeftSafeArea
				ignoreRightSafeArea
				headerFadeInThreshold={0.2}
				disableLargeHeaderFadeAnim
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: bottom,
					backgroundColor: colorScheme === 'dark' ? '#2E363B' : '#ffffff',
				}}
				renderItem={({ item }) =>
					activeTab == 0 ? <StatusItem status={item} /> : <></>
				}
				stickySectionHeadersEnabled
				renderSectionHeader={() => (
					<View className="bg-patchwork-light-900 dark:bg-patchwork-dark-100">
						<View
							className={`flex-1 flex-row bg-patchwork-light-900 dark:bg-patchwork-dark-100`}
						>
							{['Posts', 'About'].map((tab, index) => (
								<View className="flex-1">
									<TouchableOpacity
										key={`option-${index}`}
										className="flex-1 items-center justify-center h-[34]"
										onPress={() => setActiveTab(index)}
									>
										<ThemeText
											size={'md_16'}
											variant={activeTab === index ? 'default' : 'textGrey'}
											className="font-semibold"
										>
											{tab}
										</ThemeText>
										{activeTab === index && (
											<View
												className={`absolute top-5 h-[2] w-4/5 mt-3 rounded-lg bg-patchwork-dark-100 dark:bg-patchwork-light-900`}
											/>
										)}
									</TouchableOpacity>
								</View>
							))}
						</View>
						{activeTab == 1 && <Underline className="mt-1" />}
						{activeTab == 0 ? <HorizontalScrollMenu /> : <ChannelAbout />}
					</View>
				)}
			/>
		</View>
	);
};

export default ChannelTemplate;
