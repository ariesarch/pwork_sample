import React from 'react';
import { View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { NotificationTabIcon } from '@/util/svg/icon.common';

type NotiTabBarIconProps = {
	colorScheme: 'light' | 'dark';
	focused: boolean;
	notiCount: number;
};
const NotiTabBarIcon = ({
	colorScheme,
	focused,
	notiCount,
}: NotiTabBarIconProps) => {
	return (
		<View className="relative">
			<NotificationTabIcon colorScheme={colorScheme} focused={focused} />
			{notiCount > 0 && (
				<View className="absolute bottom-2 left-2 z-20 w-5 h-5 rounded-full items-center justify-center bg-patchwork-red-50">
					<ThemeText size={'xs_12'}>
						{notiCount > 99 ? 99 : notiCount}
					</ThemeText>
				</View>
			)}
		</View>
	);
};

export default NotiTabBarIcon;
