import { render, screen } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';

import { Pressable } from 'react-native';
import TextInput from './TextInput';

describe('TextInput component should render correctly', () => {
	let storage: MMKV;

	beforeAll(() => {
		storage = new MMKV();
	});

	test('when end icon value is present, should show icon', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<TextInput
					placeholder="Email Address"
					endIcon={<Pressable onPress={() => {}}>E</Pressable>}
				/>
			</ThemeProvider>
		);

		render(component);

		const endIcon = screen.getByTestId('end-icon-wrapper');

		expect(endIcon).toBeOnTheScreen();
	});
});
