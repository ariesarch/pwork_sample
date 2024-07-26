import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/header/header';
import ProgressBar from '@/components/atoms/common/ProgressBar/ProgressBar';
import ContributorProgress from '@/components/organisms/login/ContributorProgress/ContributorProgress';
import DOBPRogress from '@/components/organisms/login/DOBProgress/DOBProgress';
import InterestProgress from '@/components/organisms/login/InterestProgress/InterestProgress';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { Button } from '@/components/ui/Button/Button';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { RootScreenProps } from '@/types/navigation';
import { useState } from 'react';
import { View } from 'react-native';

const AboutYou: React.FC<RootScreenProps<'AboutYou'>> = ({ navigation }) => {
	const [activeStep, setActiveStep] = useState(1);

	return (
		<SafeScreen>
			<Header
				title="About You"
				leftCustomComponent={
					<BackButton
						customOnPress={() => {
							if (activeStep > 1) {
								setActiveStep(activeStep - 1);
							} else navigation.goBack();
						}}
					/>
				}
			/>
			<View className="mx-6 flex-1">
				<ProgressBar stepCounts={3} activeStep={activeStep} />
				{activeStep === 1 && <DOBPRogress />}
				{activeStep === 2 && <InterestProgress />}
				{activeStep === 3 && <ContributorProgress/>}
				<View className="absolute bottom-0 w-full mb-8">
					<Button
						onPress={() => {
							if (activeStep < 3) return setActiveStep(prev => prev + 1);
							return navigation.navigate('EmailVerification');
						}}
					>
						<ThemeText className="text-white">Next</ThemeText>
					</Button>
				</View>
			</View>
		</SafeScreen>
	);
};

export default AboutYou;
