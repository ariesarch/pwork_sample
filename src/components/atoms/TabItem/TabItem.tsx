import { useTheme } from '@/theme';
import { Pressable, StyleSheet, Text } from 'react-native';

export type TabItemProps = {
	tab: { value: string; label: string };
	onTabPress: (value: string) => void;
	currentTab: string;
};

const TabItem = ({ tab, onTabPress, currentTab }: TabItemProps) => {
	const isActiveTab = tab?.value === currentTab;
	const { fonts, colors, layout, gutters, borders } = useTheme();

	return (
		<Pressable
			onPress={() => onTabPress(tab?.value)}
			style={[
				{
					backgroundColor: isActiveTab ? colors.white100 : colors.gray600,
				},
				layout.flex_1,
				borders.rounded_8,
				layout.itemsCenter,
				gutters.padding_12,
			]}
			testID="tabItem-wrapper"
		>
			<Text
				style={[
					fonts.size_14,
					{
						color: isActiveTab ? colors.gray100 : colors.white100,
					},
				]}
				testID="tabItem-text"
			>
				{tab?.label}
			</Text>
		</Pressable>
	);
};

export default TabItem;
