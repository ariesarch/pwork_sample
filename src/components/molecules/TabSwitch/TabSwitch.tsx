import { useTheme } from '@/theme';
import { View, StyleSheet } from 'react-native';
import { styleConstant } from '@/theme/_config';
import TabItem from '../../atoms/TabItem/TabItem';

type TabItemProp = {
	value: string;
	label: string;
};

type Props = {
	tabs: TabItemProp[];
	onTabPress: (tab: string) => void;
	currentTab: string;
};

const TabSwitch = ({ tabs, onTabPress, currentTab }: Props) => {
	const { colors, gutters, layout } = useTheme();

	return (
		<View>
			<View
				style={[
					gutters.marginVertical_16,
					layout.row,
					{ backgroundColor: colors.gray600 },
					style.tabBarWrapper,
				]}
			>
				{Array.isArray(tabs) &&
					tabs.length >= 1 &&
					tabs.map((tab, index) => (
						<TabItem {...{ tab, currentTab, onTabPress }} key={index} />
					))}
			</View>
		</View>
	);
};

export default TabSwitch;

const style = StyleSheet.create({
	tabBarWrapper: {
		borderRadius: styleConstant.Spacing.S,
	},
});
