import OrSeparator from '@/components/atoms/common/OrSeparator/OrSeparator';
import AlreadyHaveAcc from '@/components/molecules/login/AlreadyHaveAcc/AlreadyHaveAcc';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { Button } from '@/components/ui/Button/Button';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { RootScreenProps } from '@/types/navigation';
import { MastodonIcon, PatchworkLogo } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

const Welcome: React.FC<RootScreenProps<'Welcome'>> = ({ navigation }) => {
	const { colorScheme } = useColorScheme();
	return (
		<SafeScreen>
			<View className="flex-1 justify-center items-center mx-6 ">
				<PatchworkLogo colorScheme={colorScheme} />
				<Button
					className="mt-10 mb-5 w-full h-12"
					onPress={() => navigation.navigate('Register')}
				>
					<ThemeText className="text-white">Create account</ThemeText>
				</Button>
				<OrSeparator className="mb-5" />
				<Button variant="outline" className="w-full rounded-3xl  h-12">
					<View className="flex flex-row justify-center items-center">
						<MastodonIcon />
						<ThemeText className="ml-2"> Sign in with Mastodon</ThemeText>
					</View>
				</Button>
				<AlreadyHaveAcc className="mt-4" />
			</View>
		</SafeScreen>
	);
};

export default Welcome;
