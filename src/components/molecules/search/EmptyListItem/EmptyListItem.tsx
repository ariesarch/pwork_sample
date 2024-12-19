import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { View } from 'react-native';

export const EmptyListComponent = ({ isLoading }: { isLoading: boolean }) => {
	// if (isLoading) {
	// return skeleton loading
	// }
	return (
		<View className="flex-1 items-center mt-24">
			<ThemeText size={'md_16'}>There is no detail channel.</ThemeText>
		</View>
	);
};
