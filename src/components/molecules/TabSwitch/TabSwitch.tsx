import { View } from 'react-native';
import TabItem from '../../atoms/TabItem/TabItem';
import styles from './TabSwith.style';

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
	return (
		<View>
			<View className={styles.tabWrapper}>
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
