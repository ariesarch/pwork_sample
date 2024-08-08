/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { MMKV } from 'react-native-mmkv';
import { View } from 'react-native';
import PhoneRegisterForm from './PhoneRegisterForm';
import StroyNavigator from '../../../../../.storybook/stories/Navigator/Navigator';

const storage = new MMKV();

const meta = {
	title: 'Register Form (Phone)',
	component: PhoneRegisterForm,
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
} satisfies Meta<typeof PhoneRegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {},
};
