/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@/theme';
import { MMKV } from 'react-native-mmkv';
import { View } from 'react-native';
import TextInput from './TextInput';

const storage = new MMKV();

const meta = {
	title: 'TextInput',
	component: TextInput,
	decorators: [
		Story => (
			<ThemeProvider storage={storage}>
				<View
					style={{
						backgroundColor: '#2e363b',
						padding: 15,
					}}
				>
					<Story />
				</View>
			</ThemeProvider>
		),
	],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputEmpty: Story = {
	args: {
		placeholder: 'Email',
	},
};

export const InputFill: Story = {
	args: {
		placeholder: 'Email',
		value: 'mgmg@gmail.com',
	},
};
