/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { ScrollView, View } from 'react-native';
import HorizontalInfo from '../HorizontalInfo/HorizontalInfo';
import Underline from '@/components/atoms/common/Underline/Underline';

const ContributorProgress = () => {
	return (
		<View className="pb-28">
			<ThemeText className="mb-4" variant={'textGrey'}>
				We've pre-selected the best contributors to follow based on your chosen
				interests.
			</ThemeText>
			<ScrollView className="mb-20" showsVerticalScrollIndicator={false}>
				<View>
					<HorizontalInfo />
					<Underline className="my-3" />
					<HorizontalInfo />
					<Underline className="my-3" />
					<HorizontalInfo />
					<Underline className="my-3" />
					<HorizontalInfo />
				</View>
			</ScrollView>
		</View>
	);
};

export default ContributorProgress;
