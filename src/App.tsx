import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import './translations';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';
import ApplicationNavigator from './navigators/Application';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { getAppToken } from './util/helper/helper';
import { useAuthStore, useAuthStoreAction } from './store/auth/authStore';
import { View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import customColor from './util/constant/color';
import { verifyAuthToken } from './services/auth.service';
import { ThemeText } from './components/atoms/common/ThemeText/ThemeText';
import Toast from 'react-native-toast-message';

export const queryClient = new QueryClient();

export const storage = new MMKV();

const toastConfig = {
	successToast: ({ text1 }: any) => (
		<View className="mt-5 bg-white border-l-2 border-l-green-500 items-start justify-start rounded-tr-md rounded-br-md shadow-md py-3 px-6 mx-1 flex-1">
			<ThemeText className="text-black">{text1}</ThemeText>
		</View>
	),
	errorToast: ({ text1 }: any) => (
		<View className="mt-5 bg-white border-l-2 border-l-patchwork-red-50 items-start justify-start rounded-tr-md rounded-br-md shadow-md py-3 px-6 mx-1 flex-1">
			<ThemeText className="text-black">{text1}</ThemeText>
		</View>
	),
};

function App() {
	const { setColorScheme } = useColorScheme();
	const { setAuthToken, setUserInfo } = useAuthStoreAction();
	const { access_token } = useAuthStore();
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setColorScheme('dark');
	}, []);

	useEffect(() => {
		retrieveToken();
	}, []);

	const retrieveToken = async () => {
		const token = await getAppToken();
		console.log('bb::', token);

		if (token) {
			await verifyAuthToken()
				.then(userInfo => {
					setUserInfo(userInfo);
					return setAuthToken(userInfo ? token : '');
				})
				.catch(() => {
					return setAuthToken('');
				});
			return setLoading(false);
		}
		setLoading(false);
		return setAuthToken('');
	};

	if (isLoading) {
		return (
			<View className="flex-1 bg-patchwork-dark-100 items-center justify-center">
				<Flow size={50} color={customColor['patchwork-red-50']} />
			</View>
		);
	}

	return (
		<View className="flex-1 bg-patchwork-dark-100">
			<QueryClientProvider client={queryClient}>
				<KeyboardProvider>
					<ApplicationNavigator />
					<Toast config={toastConfig} />
				</KeyboardProvider>
			</QueryClientProvider>
		</View>
	);
}

export default App;

// export { default } from '../.storybook';
