/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@/theme';
import { MMKV } from 'react-native-mmkv';
import { View } from 'react-native';
import PhoneRegisterForm from './PhoneRegisterForm';

const storage = new MMKV();

const meta = {
	title: 'Register Form (Phone)',
	component: PhoneRegisterForm,
	decorators: [
		Story => {
			return (
				<ThemeProvider storage={storage}>
					<View style={{ backgroundColor: '#2e363b', padding: 8 }}>
						<Story />
					</View>
				</ThemeProvider>
			);
		},
	],
} satisfies Meta<typeof PhoneRegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {},
};
