import React from 'react';
import { Route } from 'react-native-tab-view';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

type NotiTabBarItemLabelProps = {
	route: Route;
	focused: boolean;
};
const NotiTabBarItemLabel = ({ route, focused }: NotiTabBarItemLabelProps) => {
	return (
		<ThemeText
			size={'fs_13'}
			className={`mx-1 px-1 tracking-wide font-SourceSans3_Bold ${
				focused
					? 'text-patchwork-red-50'
					: 'text-slate-400 dark:text-patchwork-grey-100'
			}`}
		>
			{route.title}
		</ThemeText>
	);
};

export default NotiTabBarItemLabel;
