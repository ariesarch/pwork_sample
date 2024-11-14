import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { Button } from '@/components/atoms/common/Button/Button';
import Header from '@/components/atoms/common/Header/Header';
import ProgressBar from '@/components/atoms/common/ProgressBar/ProgressBar';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ChannelAddContentForm from '@/components/organisms/channel/ChannelAddContnetForm/ChannelAddContentForm';
import ChannelAdditionalInfoForm from '@/components/organisms/channel/ChannelAdditionalInfoForm/ChannelAdditionalInfoForm';
import ChannelFilterContentForm from '@/components/organisms/channel/ChannelFilterContentForm/ChannelFilterContentForm';
import ChannelInformationForm from '@/components/organisms/channel/ChannelInformationForm/ChannelInformationForm';
import ChannelShareContentForm from '@/components/organisms/channel/ChannelShareContentForm/ChannelShareContentForm';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useActiveDomainAction } from '@/store/feed/activeDomain';
import { HomeStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ChannelCreate = () => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const [activeStep, setActiveStep] = useState(1);
	const { setDomain } = useActiveDomainAction();

	return (
		<SafeScreen>
			<Header
				title="New Channel"
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
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				className="flex- mx-4 mb-[80]"
			>
				<View className="flex-1">
					<ProgressBar stepCounts={5} activeStep={activeStep} />
					{activeStep === 1 && <ChannelInformationForm />}
					{activeStep === 2 && <ChannelAddContentForm />}
					{activeStep === 3 && <ChannelFilterContentForm />}
					{activeStep === 4 && <ChannelShareContentForm />}
					{activeStep === 5 && <ChannelAdditionalInfoForm />}
				</View>
			</KeyboardAwareScrollView>
			<View className="absolute bottom-0 dark:bg-patchwork-dark-100 w-full">
				<Button
					onPress={() => {
						if (activeStep < 5) return setActiveStep(prev => prev + 1);
						// setDomain('science.channel.org');
						// return navigation.navigate('ChannelProfile', {
						// 	domain_name: 'science.channel.org',
						// });
					}}
					className="mx-4 mt-2 mb-10"
				>
					<ThemeText className="text-white">Next</ThemeText>
				</Button>
			</View>
		</SafeScreen>
	);
};

export default ChannelCreate;
