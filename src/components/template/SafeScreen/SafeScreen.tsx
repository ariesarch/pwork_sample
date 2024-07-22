import { StatusBar, View } from 'react-native';
import type { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from 'nativewind';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import styles from './safeScreen.style';

function SafeScreen({ children }: PropsWithChildren) {
	const insets = useSafeAreaInsets();
	const { colorScheme } = useColorScheme();
	const barColor = useAppropiateColorHash('patchwork-dark-100');

	return (
		<View
			style={[
				{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				},
			]}
			className={styles.layoutContainer}
		>
			<StatusBar
				barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
				backgroundColor={barColor}
			/>
			{children}
		</View>
	);
}

export default SafeScreen;
