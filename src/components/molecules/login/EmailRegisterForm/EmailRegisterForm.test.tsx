import { render } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';

import EmailRegisterForm from './EmailRegisterForm';

describe('Email Form should validate correctly and work as expected', () => {
	let storage: MMKV;

	beforeAll(() => {
		storage = new MMKV();
	});

	test('password should be crypted text when eye icon is off', () => {
		const component = <EmailRegisterForm />;

		render(component);

		// i will further continiue writing this test
	});

	test('password should be at least 6 and at most 8', () => {
		const component = <EmailRegisterForm />;

		render(component);

		// i will further continiue writing this test
	});

	test('email should end with @gmail.com, if not, should show error message', () => {
		const component = <EmailRegisterForm />;

		render(component);

		// i will further continiue writing this test
	});

	test('confirm password and password should be same, if not, should show error message', () => {
		const component = <EmailRegisterForm />;

		render(component);

		// i will further continiue writing this test
	});
});
