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

export const queryClient = new QueryClient();

export const storage = new MMKV();

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
		if (token) {
			const userInfo = await verifyAuthToken();
			setLoading(false);
			setUserInfo(userInfo);
			return setAuthToken(userInfo ? token : '');
		}
		setLoading(false);
		return setAuthToken('');
	};

	if (isLoading) {
		return (
			<View
				style={{
					backgroundColor: customColor['patchwork-dark-100'],
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Flow size={50} color={customColor['patchwork-red-50']} />
			</View>
		);
	}

	return (
		<QueryClientProvider client={queryClient}>
			<KeyboardProvider>
				<ApplicationNavigator />
			</KeyboardProvider>
		</QueryClientProvider>
	);
}

export default App;

// export { default } from '../.storybook';
