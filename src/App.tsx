import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import './translations';
import { useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import ApplicationNavigator from './navigators/Application';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
	const { setColorScheme } = useColorScheme();

	useEffect(() => {
		setColorScheme('dark');
	}, []);

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
