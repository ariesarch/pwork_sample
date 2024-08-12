/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import PhoneRegisterForm from './PhoneRegisterForm';
import {
	StoryNavigator,
	Theme,
	themeArgs,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators/index';

const meta = {
	title: 'Register Form (Phone)',
	component: PhoneRegisterForm,
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
} satisfies Meta<typeof PhoneRegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	argTypes: themeArgsType,
	args: themeArgs,
};
