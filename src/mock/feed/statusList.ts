/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const mockStatusList: Pathchwork.Status[] = [
	{
		id: 2000,
		account: {
			id: '1',
			account_id: '1',
			username: 'Test User 1',
			acct: 'testUser@patchwork',
			avatar: require('../../../assets/images/mock/mockUser1.jpeg'),
		},
		content:
			'Lorem ipsum dolor sit amet consectetur. Ut nisi etiam sapien nec tortor molestie duis. Molestie eget purus turpis nec. Risus viverra vestibulum pretium quisque eget rhoncus sed lorem.',
		created_at: '12 hr ago',
		favourite_count: 2,
		reblogs_count: 1,
		replies_count: 1,
		statusType: 'feed',
		image: require('../../../assets/images/mock/feetImageMock1.jpeg'),
	},
	{
		id: 2001,
		account: {
			id: '1',
			account_id: '1',
			username: 'Test User 2',
			acct: 'testUser@patchwork',
			avatar: require('../../../assets/images/mock/mockUser2.jpeg'),
		},
		content:
			'Lorem ipsum dolor sit amet consectetur. Ut nisi etiam sapien nec tortor molestie duis. Molestie eget purus turpis nec. Risus viverra vestibulum pretium quisque eget rhoncus sed lorem.',
		created_at: '12 hr ago',
		favourite_count: 2,
		reblogs_count: 16,
		replies_count: 6,
		statusType: 'feed',
	},
	{
		id: 2002,
		account: {
			id: '1',
			account_id: '1',
			username: 'Beta',
			acct: 'testUser@patchwork',
			avatar: require('../../../assets/images/mock/mockUser3.jpeg'),
		},
		content:
			'Lorem ipsum dolor sit amet consectetur. Ut nisi etiam sapien nec tortor molestie duis. Molestie eget purus turpis nec. Risus viverra vestibulum pretium quisque eget rhoncus sed lorem.',
		created_at: '12 hr ago',
		favourite_count: 2,
		reblogs_count: 16,
		replies_count: 6,
		statusType: 'feed',
	},
	{
		id: 20099,
		account: {
			id: '1',
			account_id: '1',
			username: 'Test User 8',
			acct: 'beta@patchwork',
			avatar: require('../../../assets/images/mock/mockUser8.jpeg'),
		},
		content:
			'Lorem ipsum dolor sit amet consectetur. Ut nisi etiam sapien nec tortor molestie duis. Molestie eget purus turpis nec. Risus viverra vestibulum pretium quisque eget rhoncus sed lorem.',
		created_at: '12 hr ago',
		favourite_count: 2,
		reblogs_count: 1,
		replies_count: 1,
		statusType: 'feed',
		reblogedStatus: {
			id: 12384,
			account: {
				id: '1',
				account_id: '1',
				username: 'Test User 4',
				acct: 'testUser@patchwork',
				avatar: require('../../../assets/images/mock/mockUser4.jpeg'),
			},
			content:
				'Consectetur quam cursus posuere at. Diam odio eu luctus viverra magna. Aliquet dui sagittis faucibus sit mi. Ultrices leo in bibendum sem.',
			created_at: '12 hr ago',
			favourite_count: 2,
			reblogs_count: 1,
			replies_count: 1,
			statusType: 'feed',
			image: require('../../../assets/images/mock/feedImg1.jpeg'),
		},
	},
	{
		id: 12387,
		account: {
			id: '1',
			account_id: '1',
			username: 'Test User 9',
			acct: 'testUser@patchwork',
			avatar: require('../../../assets/images/mock/mockUser10.jpeg'),
		},
		content:
			'Lorem ipsum dolor sit amet consectetur. Ut nisi etiam sapien nec tortor molestie duis. Molestie eget purus turpis nec. Risus viverra vestibulum pretium quisque eget rhoncus sed lorem.',
		created_at: '19 hr ago',
		favourite_count: 2,
		reblogs_count: 7,
		replies_count: 1,
		statusType: 'feed',
		replyedStatus: {
			id: 12387,
			account: {
				id: '1',
				account_id: '1',
				username: 'Test User 4',
				acct: 'testUser@patchwork',
				avatar: require('../../../assets/images/mock/mockUser4.jpeg'),
			},
			content:
				'Felis in pellentesque egestas ac accumsan pharetra augue non. Est etiam sagittis praesent enim.',
			created_at: '23 hr ago',
			favourite_count: 2,
			reblogs_count: 7,
			replies_count: 1,
			statusType: 'feed',
		},
	},
];

export const mockUserList: Pathchwork.Account[] = [
	{
		id: '1',
		account_id: '1',
		username: 'Test User 1',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser1.jpeg'),
		hasNoti: true,
	},
	{
		id: '2',
		account_id: '2',
		username: 'Test User 2',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser2.jpeg'),
		hasNoti: true,
	},
	{
		id: '3',
		account_id: '3',
		username: 'Test User 3',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser3.jpeg'),
	},
	{
		id: '4',
		account_id: '4',
		username: 'Test User 4',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser4.jpeg'),
	},
	{
		id: '5',
		account_id: '5',
		username: 'Test User 5',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser5.jpeg'),
	},
	{
		id: '6',
		account_id: '6',
		username: 'Test User 6',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser6.jpeg'),
	},
	{
		id: '7',
		account_id: '7',
		username: 'Test User 7',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser7.jpeg'),
	},
	{
		id: '8',
		account_id: '8',
		username: 'Test User 8',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser8.jpeg'),
	},
	{
		id: '9',
		account_id: '9',
		username: 'Test User 10',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser10.jpeg'),
	},
	{
		id: '10',
		account_id: '10',
		username: 'Test User 10',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser10.jpeg'),
	},
	{
		id: '11',
		account_id: '11',
		username: 'Test User 11',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser11.jpeg'),
	},
	{
		id: '12',
		account_id: '12',
		username: 'Test User 12',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser12.jpeg'),
	},
	{
		id: '13',
		account_id: '13',
		username: 'Test User 13',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser13.jpeg'),
	},
	{
		id: '14',
		account_id: '14',
		username: 'Test User 14',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser14.jpeg'),
	},
	{
		id: '15',
		account_id: '15',
		username: 'Test User 15',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser15.jpeg'),
	},
	{
		id: '16',
		account_id: '16',
		username: 'Test User 16',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser16.jpeg'),
	},
	{
		id: '17',
		account_id: '17',
		username: 'Test User 17',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser17.jpeg'),
	},
	{
		id: '18',
		account_id: '18',
		username: 'Test User 18',
		acct: 'beta@patchwork',
		avatar: require('../../../assets/images/mock/mockUser18.jpeg'),
	},
];

export const mockCommandStatusList: Pathchwork.Status[] = [
	{
		id: 12384,
		account: {
			id: '1',
			account_id: '1',
			username: 'Test User 6',
			acct: 'beta@patchwork',
			avatar: require('../../../assets/images/mock/mockUser6.jpeg'),
		},
		content:
			'Felis in pellentesque egestas ac accumsan pharetra augue non. Est etiam sagittis praesent enim.',
		created_at: '19 hr ago',
		favourite_count: 1,
		reblogs_count: 16,
		replies_count: 6,
		statusType: 'feed',
	},
	{
		id: 12386,
		account: {
			id: '1',
			account_id: '1',
			username: 'Test User 2',
			acct: 'beta@patchwork',
			avatar: require('../../../assets/images/mock/mockUser2.jpeg'),
		},
		content:
			'Leo quam sagittis amet fames porttitor. Pretium et vitae tincidunt quam sit et aenean. Vulputate vulputate proin magna purus tortor scelerisque lobortis felis mi. Fringilla amet pellentesque ut nunc.',
		created_at: '19 hr ago',
		favourite_count: 1,
		reblogs_count: 16,
		replies_count: 6,
		statusType: 'feed',
	},
	{
		id: 12387,
		account: {
			id: '1',
			account_id: '1',
			username: 'Test User 8',
			acct: 'beta@patchwork',
			avatar: require('../../../assets/images/mock/mockUser8.jpeg'),
		},
		content:
			'Scelerisque a sed convallis turpis nunc ultrices ut habitasse. Nisl cursus tempus facilisis gravida morbi feugiat arcu. Eget aliquet varius arcu consequat velit nulla. Pulvinar consequat dolor diam eu cursus elementum nunc ultricies. Gravida dui nulla leo vitae tincidunt fames maecenas magna dignissim. Egestas id vitae pellentesque nulla risus gravida.',
		created_at: '19 hr ago',
		favourite_count: 1,
		reblogs_count: 16,
		replies_count: 6,
		statusType: 'feed',
	},
];
