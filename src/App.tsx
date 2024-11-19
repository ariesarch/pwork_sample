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

export const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
	const { setColorScheme } = useColorScheme();
	const { setAuthToken } = useAuthStoreAction();
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
		setLoading(false);
		console.log('token::', token);
		if (token) {
			return setAuthToken(token);
		}
		return setAuthToken('');
	};

	if (isLoading) {
		return <></>;
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
