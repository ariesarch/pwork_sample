/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { mockStatusList } from '@/mock/feed/statusList';
import StatusItem from './StatusItem';
import {
	StoryNavigator,
	Theme,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators';

type ComponentWithCustomArgs = React.ComponentProps<typeof StatusItem> & Theme;

const meta = {
	title: 'UI/Status/StatusItem',
	component: StatusItem,
	decorators: [
		(Story, props) => {
			return (
				<StoryNavigator additionalStyle={{ marginHorizontal: 0 }}>
					<ThemeProvider theme={props.args.theme}>
						<Story />
					</ThemeProvider>
				</StoryNavigator>
			);
		},
	],
} satisfies Meta<ComponentWithCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	argTypes: {
		...themeArgsType,
	},
	args: {
		theme: 'dark',
		status: mockStatusList[0],
	},
};
