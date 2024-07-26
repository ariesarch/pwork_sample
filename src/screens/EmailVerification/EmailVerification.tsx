/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-unescaped-entities */
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/header/header';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { RootScreenProps } from '@/types/navigation';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

const EmailVerification: React.FC<RootScreenProps<'EmailVerification'>> = ({
	navigation,
}) => {
	const [activeStep, setActiveStep] = useState(1);
	const [timer, setTimer] = useState(60);
	const [code, setCode] = useState(['', '', '', '']);

	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer(timer - 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	useEffect(() => {
		const isSpaceInclude = code.includes('');
		if (!isSpaceInclude) {
			navigation.navigate('Index');
		}
	}, [code]);

	const handleInputChange = (text, index) => {
		const newCode = [...code];
		newCode[index] = text;
		setCode(newCode);
	};

	return (
		<SafeScreen>
			<Header
				title="Email Verification"
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
			<View className="flex items-center  h-full ">
				{/* <ThemeText variant="textGrey"> */}
				<ThemeText className=" mb-2">We sent a code to your email</ThemeText>
				<ThemeText className=" mb-4">email@email.com</ThemeText>
				<View className="flex flex-row mb-4">
					{code.map((digit, index) => (
						<TextInput
							key={index}
							keyboardType="numeric"
							maxLength={1}
							placeholder=""
							onChangeText={text => handleInputChange(text, index)}
							value={digit}
							showUnderLine
							styleNW="rounded-md w-16 h-16 text-center text-xl mx-1"
						/>
					))}
				</View>
				<ThemeText>
					{' '}
					Don't receive your code? Re-send in {timer} sec..
				</ThemeText>
			</View>
		</SafeScreen>
	);
};

export default EmailVerification;
