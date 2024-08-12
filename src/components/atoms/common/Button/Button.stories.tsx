import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import {
	StoryNavigator,
	Theme,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators';
import { ThemeText } from '../ThemeText/ThemeText';

type ComponentWithCustomArgs = React.ComponentProps<typeof Button> & Theme;

const meta = {
	title: 'Button',
	component: Button,
	decorators: [
		(Story, props) => {
			return (
				<StoryNavigator>
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
		variant: {
			control: 'radio',
			options: ['default', 'outline', 'secondary'],
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg', 'xl', 'icon'],
		},
	},
	args: {
		theme: 'dark',
		size: 'default',
		variant: 'default',
		children: <ThemeText>Login</ThemeText>,
	},
};
