import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { CheckIcon } from '@/util/svg/icon.common';
import Chip from './Chip';
import {
	StoryNavigator,
	Theme,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators';
import { TwitterIcon } from '@/util/svg/icon.profile';

type ComponentWithCustomArgs = React.ComponentProps<typeof Chip> & Theme;

const meta = {
	title: 'Chip',
	component: Chip,
	decorators: [
		(Story, props) => {
			return (
				<StoryNavigator>
					<ThemeProvider theme={props.args.theme}>
						<View className="flex-row">
							<Story />
						</View>
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
			options: ['default', 'outline', 'white'],
		},
	},
	args: {
		theme: 'dark',
		variant: 'default',
		title: 'Test',
		dotAlert: true,
	},
};

export const ChipWithEndIcon: Story = {
	argTypes: Basic.argTypes,
	args: {
		title: 'Following',
		variant: 'outline',
		theme: 'dark',
		endIcon: <CheckIcon colorScheme={this?.args?.theme} />,
		dotAlert: true,
	},
};

export const ChipWithFrontIcon: Story = {
	argTypes: Basic.argTypes,
	args: {
		title: 'Following',
		variant: 'outline',
		theme: 'dark',
		startIcon: <TwitterIcon />,
		dotAlert: true,
	},
};
