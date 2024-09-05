import type { Meta, StoryObj } from '@storybook/react';
import StatusTypeCheckBox from './StatusTypeCheckBox';
import {
	StoryNavigator,
	Theme,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators';

type ComponentWithCustomArgs = React.ComponentProps<typeof StatusTypeCheckBox> &
	Theme;

const meta = {
	title: 'Atom/Channel/StatusTypeCheckBox',
	component: StatusTypeCheckBox,
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
	},
	args: {
		theme: 'dark',
		title: 'Post',
	},
};
