import { Button } from '@/components/atoms/common/Button/Button';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { View, ViewProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import styles from './AlreadyHaveAcc.style';

const AlreadyHaveAcc = ({ ...props }: ViewProps) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	return (
		<View className={styles.wrapper} {...props}>
			<ThemeText variant="textGrey">Already have an account?</ThemeText>
			<Button
				variant="outline"
				size={'sm'}
				className={styles.signInBtn}
				onPress={() => navigation.navigate('Login')}
			>
				<ThemeText size={'fs_13'}>Sign In</ThemeText>
			</Button>
		</View>
	);
};

export default AlreadyHaveAcc;
