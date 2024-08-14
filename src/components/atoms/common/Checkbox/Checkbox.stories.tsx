/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import {
	StoryNavigator,
	Theme,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators';
import { ThemeText } from '../ThemeText/ThemeText';

type ComponentWithCustomArgs = React.ComponentProps<typeof Checkbox> & Theme;

const meta = {
	title: 'Atom/Common/Checkbox',
	component: Checkbox,
	decorators: [
		(Story, props) => {
			return (
				<StoryNavigator additionalStyle={{ marginTop: 30 }}>
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
		children: <ThemeText className="ml-2">Test</ThemeText>,
	},
};
