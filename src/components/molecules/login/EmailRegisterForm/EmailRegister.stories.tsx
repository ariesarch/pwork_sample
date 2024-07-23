/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@/theme';
import { MMKV } from 'react-native-mmkv';
import { View } from 'react-native';
import EmailRegisterForm from './EmailRegisterForm';

const storage = new MMKV();

const meta = {
	title: 'Register Form (Email)',
	component: EmailRegisterForm,
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
} satisfies Meta<typeof EmailRegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {},
};
