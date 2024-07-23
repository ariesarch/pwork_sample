/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@/theme';
import { MMKV } from 'react-native-mmkv';
import { View } from 'react-native';
import TabItem from './TabItem';

const storage = new MMKV();

const meta = {
	title: 'Tab Item',
	component: TabItem,
	decorators: [
		Story => (
			<ThemeProvider storage={storage}>
				<View style={{ height: 60, backgroundColor: '#2e363b', padding: 5 }}>
					<Story />
				</View>
			</ThemeProvider>
		),
	],
} satisfies Meta<typeof TabItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		tab: { value: '1', label: 'Test Item' },
		onTabPress: () => {},
		currentTab: '1',
	},
};

export const InActive: Story = {
	args: {
		tab: { value: '2', label: 'Inactive Item' },
		onTabPress: () => {},
		currentTab: '1',
	},
};
