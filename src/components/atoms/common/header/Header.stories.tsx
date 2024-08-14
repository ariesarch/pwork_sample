/* eslint-disable react-native/no-inline-styles */
import type { Meta, StoryObj } from '@storybook/react';
import { Pressable } from 'react-native';
import { SettingIcon } from '@/util/svg/icon.common';
import Header from './Header';
import {
	StoryNavigator,
	Theme,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators';
import BackButton from '../BackButton/BackButton';
import { ThemeText } from '../ThemeText/ThemeText';

type ComponentWithCustomArgs = React.ComponentProps<typeof Header> & Theme;

const meta = {
	title: 'Atom/Common/Header',
	component: Header,
	decorators: [
		(Story, props) => {
			return (
				<StoryNavigator
					additionalStyle={{ marginHorizontal: 0, marginVertical: 0 }}
				>
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
		title: 'Test',
		leftCustomComponent: <BackButton />,
	},
};

const optionMapping = {
	text: (
		<Pressable
			onPress={() => {}}
			className="border-[1] border-[1px] border-patchwork-grey-100 py-[6] px-3 rounded-full"
		>
			<ThemeText>Post</ThemeText>
		</Pressable>
	),
	icon: (
		<Pressable className="p-3 border border-patchwork-grey-100 rounded-full active:opacity-80">
			<SettingIcon />
		</Pressable>
	),
};

export const WithRightComponent: Story = {
	argTypes: {
		...themeArgsType,
		rightCustomComponent: {
			control: 'radio',
			options: ['text', 'icon'],
			description: 'Right Component',
			mapping: optionMapping,
		},
	},
	args: {
		...Basic.args,
		rightCustomComponent: optionMapping.icon,
	},
};
