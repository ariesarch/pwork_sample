/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { MMKV } from 'react-native-mmkv';
import { View } from 'react-native';
import TabItem from './TabItem';
import StroyNavigator from '../../../../../.storybook/stories/Navigator/Navigator';

const storage = new MMKV();

const meta = {
	title: 'Tab Item',
	tags: ['autodocs'],
	component: TabItem,
	decorators: [
		Story => (
			<StroyNavigator>
				<View style={{ height: 60, backgroundColor: '#2e363b', padding: 5 }}>
					<Story />
				</View>
			</StroyNavigator>
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
