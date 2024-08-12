import type { Meta, StoryObj } from '@storybook/react';
import PhoneLoginForm from './PhoneLoginForm';
import {
	StoryNavigator,
	Theme,
	themeArgs,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators/index';

const meta = {
	title: 'Login Form (Phone)',
	component: PhoneLoginForm,
	decorators: [
		(Story, prop) => {
			return (
				<StoryNavigator>
					<ThemeProvider theme={(prop.args as Theme).theme}>
						<Story />
					</ThemeProvider>
				</StoryNavigator>
			);
		},
	],
} satisfies Meta<typeof PhoneLoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	argTypes: themeArgsType,
	args: themeArgs,
};
