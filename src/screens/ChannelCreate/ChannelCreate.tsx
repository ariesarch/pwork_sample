import { Button } from '@/components/atoms/common/Button/Button';
import Header from '@/components/atoms/common/Header/Header';
import ProgressBar from '@/components/atoms/common/ProgressBar/ProgressBar';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ChannelAddContentForm from '@/components/organisms/channel/ChannelAddContnetForm/ChannelAddContentForm';
import ChannelFilterContentForm from '@/components/organisms/channel/ChannelFilterContentForm/ChannelFilterContentForm';
import ChannelInformationForm from '@/components/organisms/channel/ChannelInformationForm/ChannelInformationForm';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { BackIcon } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ChannelCreate = () => {
	const navigation = useNavigation();
	const { colorScheme } = useColorScheme();
	const [activeStep, setActiveStep] = useState(1);

	return (
		<SafeScreen>
			<Header
				title="New Channel"
				leftCustomComponent={
					<Pressable onPress={() => navigation.goBack()}>
						<BackIcon colorScheme={colorScheme} />
					</Pressable>
				}
			/>
			<KeyboardAwareScrollView
				// contentContainerStyle={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
				className="flex- mx-4 mb-4"
			>
				<View className="flex-1">
					<ProgressBar stepCounts={5} activeStep={activeStep} />
					{activeStep === 1 && <ChannelInformationForm />}
					{activeStep === 2 && <ChannelAddContentForm />}
					{activeStep === 3 && <ChannelFilterContentForm />}
				</View>
				<Button
					onPress={() => {
						if (activeStep < 5) return setActiveStep(prev => prev + 1);
						return navigation.navigate('ChannelDetail');
					}}
				>
					<ThemeText className="text-white">Next</ThemeText>
				</Button>
			</KeyboardAwareScrollView>
		</SafeScreen>
	);
};

export default ChannelCreate;
