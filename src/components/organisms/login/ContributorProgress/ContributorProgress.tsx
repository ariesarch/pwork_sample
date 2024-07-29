/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import Avatar from '@/components/atoms/profile/Avatar';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { ScrollView } from 'react-native';
import HorizontalInfo from '../HorizontalInfo/HorizontalInfo';
import { scale } from '@/util/helper/helper';
import Underline from '@/components/atoms/common/Underline/Underline';

const ContributorProgress = () => {
	return (
		<ScrollView
			contentContainerStyle={{ paddingBottom: scale(4) }}
			showsVerticalScrollIndicator={false}
		>
			<ThemeText className="my-3">
				We've pre-selected the best contributors to follow based on your chosen
				interests.
			</ThemeText>
			<HorizontalInfo />
			<Underline className="my-3" />
			<HorizontalInfo />
			<Underline className="my-3" />
			<HorizontalInfo />
			<Underline className="my-3" />
			<HorizontalInfo />
		</ScrollView>
	);
};

export default ContributorProgress;
