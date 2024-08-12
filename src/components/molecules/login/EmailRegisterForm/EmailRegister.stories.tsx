import type { Meta, StoryObj } from '@storybook/react';
import EmailRegisterForm from './EmailRegisterForm';
import {
	StoryNavigator,
	Theme,
	themeArgs,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators/index';

const meta = {
	title: 'Register Form (Email)',
	component: EmailRegisterForm,
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
} satisfies Meta<typeof EmailRegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	argTypes: themeArgsType,
	args: themeArgs,
};
