import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import CommunityItem from './CommunityItem';
import {
	StoryNavigator,
	Theme,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators';

type ComponentWithCustomArgs = React.ComponentProps<typeof CommunityItem> &
	Theme;

const meta = {
	title: 'Atom/Register/CommunityItem',
	component: CommunityItem,
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
		theme: 'dark',
	},
};
