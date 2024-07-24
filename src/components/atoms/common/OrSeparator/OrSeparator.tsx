import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { View, ViewProps } from 'react-native';
import styles from './OrSeparator.style';

const OrSeparator = (prop: ViewProps) => {
	return (
		<View className={styles.separatorWrapper} {...prop}>
			<View className={styles.separatorLine} />
			<ThemeText className="mx-4">or</ThemeText>
			<View className={styles.separatorLine} />
		</View>
	);
};

export default OrSeparator;
