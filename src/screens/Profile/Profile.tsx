import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SectionListWithHeaders } from '@codeherence/react-native-header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { statusListData } from '@/mock/feed/statusList';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import { useColorScheme } from 'nativewind';
import ProfileInfo from '@/components/organisms/profile/ProfileInfo';
import CommonHeader from '@/components/molecules/common/CommonHeader/CommonHeader';

const Profile = () => {
	const { colorScheme } = useColorScheme();
	const { bottom } = useSafeAreaInsets();
	const [activeTab, setActiveTab] = useState(0);

	return (
		<View className="flex-1 bg-patchwork-light-900 dark:bg-patchwork-dark-100">
			<SectionListWithHeaders
				HeaderComponent={CommonHeader}
				LargeHeaderComponent={ProfileInfo}
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
				renderItem={({ item }) => <></>}
				stickySectionHeadersEnabled
				showsVerticalScrollIndicator={false}
				renderSectionHeader={() => (
					<View
						className={
							'flex-row bg-patchwork-light-900 dark:bg-patchwork-dark-100'
						}
					>
						{['Posts', 'Replies'].map((tab, index) => (
							<TouchableOpacity
								key={`option-${index}`}
								className="flex-1 items-center justify-center"
								onPress={() => setActiveTab(index)}
							>
								<ThemeText
									size={'md_16'}
									variant={activeTab === index ? 'default' : 'textGrey'}
									className="py-2 font-semibold"
								>
									{tab}
								</ThemeText>
								{activeTab === index && (
									<View
										className={
											'h-[2] w-4/5 bg-patchwork-dark-100 dark:bg-patchwork-light-900'
										}
									/>
								)}
							</TouchableOpacity>
						))}
					</View>
				)}
			/>
		</View>
	);
};

export default Profile;
