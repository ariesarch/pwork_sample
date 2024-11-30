import { View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import styles from './Header.style';
import Underline from '../Underline/Underline';

type Props = {
	title?: string;
	leftCustomComponent?: React.ReactElement;
	rightCustomComponent?: React.ReactElement;
	hideUnderline?: boolean;
} & ViewProps;
const Header = ({
	title,
	leftCustomComponent,
	rightCustomComponent,
	hideUnderline = false,
	...props
}: Props) => {
	return (
		<>
			<View className={styles.headerContainer} {...props}>
				{leftCustomComponent && (
					<View className="absolute left-0 z-10">{leftCustomComponent}</View>
				)}
				<View className="flex-1 items-center justify-center">
					<ThemeText
						size={'md_16'}
						className="font-SourceSans3_Bold tracking-wide"
					>
						{title}
					</ThemeText>
				</View>
				{rightCustomComponent && (
					<View className="absolute right-0 z-10">{rightCustomComponent}</View>
				)}
				<View />
			</View>
			{!hideUnderline && <Underline className="mb-3" />}
		</>
	);
};

export default Header;
