import OrSeparator from '@/components/atoms/common/OrSeparator/OrSeparator';
import AlreadyHaveAcc from '@/components/molecules/login/AlreadyHaveAcc/AlreadyHaveAcc';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { Button } from '@/components/atoms/common/Button/Button';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { GuestStackScreenProps, RootScreenProps } from '@/types/navigation';
import { MastodonIcon, PatchworkLogo } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

const Welcome: React.FC<GuestStackScreenProps<'Welcome'>> = ({
	navigation,
}) => {
	const { colorScheme } = useColorScheme();
	return (
		<SafeScreen>
			<View className="flex-1 justify-center mx-6 mb-9">
				<View className="flex-grow justify-end items-center">
					<PatchworkLogo colorScheme={colorScheme} />
					{/* <Button
					className="mt-10 mb-5 w-full h-12"
					onPress={() => navigation.navigate('Register')}
				>
					<ThemeText className="text-white">Create account</ThemeText>
				</Button>
				<OrSeparator className="mb-5" /> */}
					{/* <Button
						disabled
						variant="outline"
						className="w-full rounded-3xl h-12 mt-10"
					>
						<View className="flex-row justify-center items-center">
							<MastodonIcon />
							<ThemeText className="ml-2"> Sign in with Mastodon</ThemeText>
						</View>
					</Button> */}
					<AlreadyHaveAcc className="mt-4" />
				</View>

				<View className="flex-1 justify-end mx-5">
					<ThemeText className="text-center" variant={'textGrey'}>
						By continuing you agree to our{' '}
						<ThemeText className="text-sm">
							Terms & Conditions, Privacy Policy
						</ThemeText>
					</ThemeText>
				</View>
			</View>
		</SafeScreen>
	);
};

export default Welcome;
