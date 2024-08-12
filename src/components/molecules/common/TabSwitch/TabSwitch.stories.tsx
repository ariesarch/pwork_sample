import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TabSwitch from './TabSwitch';
import {
	StoryNavigator,
	Theme,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators';

type ComponentWithCustomArgs = React.ComponentProps<typeof TabSwitch> & Theme;

const meta = {
	title: 'Tab Switch',
	component: TabSwitch,
	decorators: [
		(Story, props) => {
			const [currentTab, setCurrentTab] = useState('1');
			const tabs = [
				{ value: '1', label: 'Email' },
				{ value: '2', label: 'Phone' },
			];

			const handleTabPress = (tabValue: string) => {
				setCurrentTab(tabValue);
			};
			return (
				<StoryNavigator>
					<ThemeProvider theme={props.args.theme}>
						<Story args={{ tabs, currentTab, onTabPress: handleTabPress }} />
					</ThemeProvider>
				</StoryNavigator>
			);
		},
	],
} satisfies Meta<ComponentWithCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	argTypes: themeArgsType,
	args: {
		tabs: [
			{ value: '1', label: 'Test Item' },
			{ value: '2', label: 'Test Item 2' },
		],
		onTabPress: () => {},
		currentTab: '1',
		theme: 'dark',
	},
};
