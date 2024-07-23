import { Button } from '@/components/ui/Button/Button';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { View, ViewProps } from 'react-native';
import styles from './AlreadyHaveAcc.style';

const AlreadyHaveAcc = ({ ...props }: ViewProps) => {
	return (
		<View className={styles.wrapper} {...props}>
			<ThemeText variant="textGrey">Already have an account?</ThemeText>
			<Button variant="outline" className={styles.signInBtn}>
				<ThemeText>Sign In</ThemeText>
			</Button>
		</View>
	);
};

export default AlreadyHaveAcc;
