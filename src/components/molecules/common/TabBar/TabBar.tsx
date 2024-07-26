/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
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
			style={{ backgroundColor: color, elevation: 0, marginHorizontal: 16 }}
			renderIndicator={indicatorProps => {
				return (
					<TabBarIndicator
						{...indicatorProps}
						style={{
							backgroundColor: indicator,
						}}
						width="50%"
					/>
				);
			}}
			pressOpacity={1}
			pressColor="#82868922"
			renderLabel={({ route, focused }) => (
				<ThemeText
					size="md_16"
					className={`font-bold ${
						focused
							? 'text-black dark:text-white'
							: 'text-slate-400 dark:text-patchwork-grey-100'
					}`}
				>
					{route.title}
				</ThemeText>
			)}
		/>
	);
};

export default TabBar;
