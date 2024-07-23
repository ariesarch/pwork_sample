/* eslint-disable react/require-default-props */
import { View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import styles from './header.style';

type Props = {
	title: string;
	leftCustomComponent?: React.ReactElement;
	rightCustomComponent?: React.ReactElement;
} & ViewProps;
const Header = ({
	title,
	leftCustomComponent,
	rightCustomComponent,
	...props
}: Props) => {
	return (
		<View className={styles.headerContainer} {...props}>
			{leftCustomComponent && (
				<View className="absolute left-0">{leftCustomComponent}</View>
			)}
			<View className="flex-1 items-center justify-center">
				<ThemeText>{title}</ThemeText>
			</View>
			{rightCustomComponent && (
				<View className="absolute right-0">{rightCustomComponent}</View>
			)}
			<View />
		</View>
	);
};

export default Header;
