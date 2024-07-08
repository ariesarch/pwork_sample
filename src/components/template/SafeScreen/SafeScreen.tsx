import { StatusBar, View } from 'react-native';
import type { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './safeScreen.style';

function SafeScreen({ children }: PropsWithChildren) {
	const insets = useSafeAreaInsets();

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
			<StatusBar barStyle="light-content" backgroundColor="#2E363B" />
			{children}
		</View>
	);
}

export default SafeScreen;
