import { render } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';

import PhoneRegisterForm from './PhoneRegisterForm';

describe('Phone Register Form should validate correctly and work as expected', () => {
	let storage: MMKV;

	beforeAll(() => {
		storage = new MMKV();
	});

	test('password should be crypted text when eye icon is off', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<PhoneRegisterForm />
			</ThemeProvider>
		);

		render(component);

		// i will further continiue writing this test
	});

	test('password should be at least 6 and at most 8', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<PhoneRegisterForm />
			</ThemeProvider>
		);

		render(component);

		// i will further continiue writing this test
	});

	test('confirm password and password should be same, if not, should show error message', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<PhoneRegisterForm />
			</ThemeProvider>
		);

		render(component);

		// i will further continiue writing this test
	});
});
