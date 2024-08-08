/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { MMKV } from 'react-native-mmkv';
import { View } from 'react-native';
import EmailLoginForm from './EmailLoginForm';
import StroyNavigator from '../../../../../.storybook/stories/Navigator/Navigator';

const meta = {
	title: 'Login Form (Email)',
	component: EmailLoginForm,
	decorators: [
		Story => {
			return (
				<StroyNavigator>
					<Story />
				</StroyNavigator>
			);
		},
	],
} satisfies Meta<typeof EmailLoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {},
};
