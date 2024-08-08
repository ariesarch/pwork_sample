/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { MMKV } from 'react-native-mmkv';
import { View } from 'react-native';
import EmailLoginForm from './EmailLoginForm';

const storage = new MMKV();

const meta = {
	title: 'Login Form (Email)',
	component: EmailLoginForm,
	decorators: [
		Story => {
			return (
				<View style={{ backgroundColor: '#2e363b', padding: 8 }}>
					<Story />
				</View>
			);
		},
	],
} satisfies Meta<typeof EmailLoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {},
};
