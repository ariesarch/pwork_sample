/* eslint-disable no-param-reassign */
import type { Meta, StoryObj } from '@storybook/react';
import { mockUserList } from '@/mock/feed/statusList';
import { mockHashTag, mockLocalChannelList } from '@/mock/feed/myChanel';
import AccountAvatar from '@/components/molecules/feed/AccountAvatar/AccountAvatar';
import HorizontalItemRenderer from './HorizontalItemRenderer';
import {
	StoryNavigator,
	Theme,
	themeArgsType,
	ThemeProvider,
} from '../../../../../.storybook/decorators';
import Card from '../../card/Card';
import Chip from '../Chip/Chip';

type ComponentWithCustomArgs = React.ComponentProps<
	typeof HorizontalItemRenderer
> & { dataType: 'User' | 'Channel' | 'Hashtag' } & Theme;

const meta = {
	title: 'Atom/Common/HorizontalItemRenderer',
	component: HorizontalItemRenderer,
	decorators: [
		(Story, props) => {
			switch (props.args.dataType) {
				case 'Hashtag': {
					props.args.data = mockHashTag;
					props.args.renderItem = item => (
						<Chip
							variant="outline"
							title={(item as Pathchwork.HashTag).name}
							className="mx-1"
							dotAlert={(item as Pathchwork.HashTag).hasNoti}
						/>
					);
					break;
				}
				case 'Channel': {
					props.args.data = mockLocalChannelList;
					props.args.renderItem = item => (
						<Card
							imageSource={(item as Pathchwork.Channel).image}
							title={(item as Pathchwork.Channel).title}
							onPress={() => {}}
						/>
					);
					break;
				}
				default: {
					props.args.data = mockUserList.slice(0, 10);
					props.args.renderItem = item => (
						<AccountAvatar
							account={item as Pathchwork.Account}
							size={20}
							className="mr-3"
						/>
					);
					break;
				}
			}
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
		dataType: {
			control: 'radio',
			options: ['User', 'Channel', 'Hashtag'],
		},
	},
	args: {
		theme: 'dark',
		dataType: 'User',
		renderItem: item => (
			<AccountAvatar
				account={item as Pathchwork.Account}
				size={20}
				className="mr-3"
			/>
		),
	},
};
