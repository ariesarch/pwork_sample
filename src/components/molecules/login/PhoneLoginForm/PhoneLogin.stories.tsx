/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { MMKV } from 'react-native-mmkv';
import { View } from 'react-native';
import PhoneLoginForm from './PhoneLoginForm';
import StroyNavigator from '../../../../../.storybook/stories/Navigator/Navigator';

const storage = new MMKV();

const meta = {
	title: 'Login Form (Email)',
	component: PhoneLoginForm,
	decorators: [
		Story => {
			return (
				<StroyNavigator>
					<View style={{ backgroundColor: '#2e363b', padding: 8 }}>
						<Story />
					</View>
				</StroyNavigator>
			);
		},
	],
} satisfies Meta<typeof PhoneLoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {},
};
