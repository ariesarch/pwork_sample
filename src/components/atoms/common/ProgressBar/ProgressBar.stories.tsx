import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from './ProgressBar';
import {
	StoryNavigator,
	Theme,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators';

type ComponentWithCustomArgs = React.ComponentProps<typeof ProgressBar> & Theme;

const meta = {
	title: 'Atom/Common/ProgressBar',
	component: ProgressBar,
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
		stepCounts: { range: true, min: 3, max: 10, step: 1 },
		activeStep: { range: true, min: 1, max: 10, step: 1 },
	},
	args: {
		theme: 'dark',
		stepCounts: 5,
		activeStep: 1,
	},
};
