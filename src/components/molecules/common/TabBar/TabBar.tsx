/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import {
	TabBar as RNTabBar,
	Route,
	TabBarIndicator,
	TabBarProps,
} from 'react-native-tab-view';

type Props = TabBarProps<Route>;

const TabBar = (props: Props) => {
	const color = useAppropiateColorHash(
		'patchwork-dark-100',
		'patchwork-light-900',
	);

	const indicator = useAppropiateColorHash(
		'patchwork-light-900',
		'patchwork-dark-100',
	);

	return (
		<RNTabBar
			{...props}
			style={[{ backgroundColor: color, elevation: 0, marginHorizontal: 16 }, props.style]}
			renderIndicator={indicatorProps => {
				return (
					<TabBarIndicator
						{...indicatorProps}
						style={[{ backgroundColor: indicator }, props.indicatorStyle]}
					/>
				);
			}}
			pressOpacity={1}
			pressColor="#82868922"
			renderLabel={props.renderLabel}
		/>
	);
};

export default TabBar;
