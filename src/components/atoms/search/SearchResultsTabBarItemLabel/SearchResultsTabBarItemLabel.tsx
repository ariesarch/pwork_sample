import React from 'react';
import { Route } from 'react-native-tab-view';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

type SearchResultsTabBarItemLabelProps = {
	route: Route;
	focused: boolean;
};

const SearchResultsTabBarItemLabel = ({ route, focused }: SearchResultsTabBarItemLabelProps) => {
	return (
		<ThemeText
			className={`text-center tracking-wide font-bold ${
				focused
					? 'text-patchwork-red-50'
					: 'text-slate-400 dark:text-patchwork-grey-100'
			}`}
			style={{ flex:1 }} // Ensure the text takes up the full width of the container
		>
			{route.title}
		</ThemeText>
	);
};

export default SearchResultsTabBarItemLabel;
