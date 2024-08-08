/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { MMKV } from 'react-native-mmkv';
import { View } from 'react-native';
import { useState } from 'react';
import TabSwitch from './TabSwitch';

const storage = new MMKV();

const meta = {
	title: 'Tab Bar',
	component: TabSwitch,
	decorators: [
		Story => {
			const [currentTab, setCurrentTab] = useState('1');
			const tabs = [
				{ value: '1', label: 'Test Item' },
				{ value: '2', label: 'Test Item 2' },
			];

			const handleTabPress = (tabValue: string) => {
				setCurrentTab(tabValue);
			};
			return (
				<View style={{ backgroundColor: '#2e363b', padding: 8 }}>
					<Story args={{ tabs, currentTab, onTabPress: handleTabPress }} />
				</View>
			);
		},
	],
} satisfies Meta<typeof TabSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		tabs: [
			{ value: '1', label: 'Test Item' },
			{ value: '2', label: 'Test Item 2' },
		],
		onTabPress: () => {},
		currentTab: '1',
	},
};
