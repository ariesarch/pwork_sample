import { View } from 'react-native';
import styles from './ProgressBar.style';

type Props = {
	stepCounts: number;
	activeStep: number;
};

const ProgressBar = ({ stepCounts, activeStep }: Props) => {
	return (
		<View className={styles.progressWraper}>
			{Array(stepCounts)
				.fill(stepCounts)
				.map((_, index) => {
					const isCurrentStepProgressed = activeStep >= index + 1;
					return (
						<View
							key={index}
							className={styles.getBarWrapperStyle(isCurrentStepProgressed)}
							style={{ width: `${100 / stepCounts - 1}%` }}
						/>
					);
				})}
		</View>
	);
};

export default ProgressBar;
