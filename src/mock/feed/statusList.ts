/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const mockStatusList: Pathchwork.Status[] = [
	{
		id: 12384,
		account: {
			id: '1',
			account_id: '1',
			username: 'Test User 1',
			acct: 'testUser@patchwork',
			avatar: require('../../../assets/images/mock/user3.jpeg'),
		},
		content:
			'Images are not technically inserted into a web page; images are linked to web pages. The <img> tag creates a holding space for the referenced image.',
		created_at: '12 hr ago',
		favourite_count: 2,
		reblogs_count: 1,
		replies_count: 1,
		statusType: 'feed',
		image: require('../../../assets/images/mock/feedImg1.jpeg'),
	},
	{
		id: 12384,
		account: {
			id: '1',
			account_id: '1',
			username: 'Test User 2',
			acct: 'beta@patchwork',
			avatar: require('../../../assets/images/mock/user2.jpeg'),
		},
		content:
			'Nec facilisis faucibus auctor pharetra ac in faucibus tortor. Lobortis enim nunc velit egestas sociis eu praesent pretium.',
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
				username: 'Test User 1',
				acct: 'testUser@patchwork',
				avatar: require('../../../assets/images/mock/user3.jpeg'),
			},
			content:
				'Images are not technically inserted into a web page; images are linked to web pages. The <img> tag creates a holding space for the referenced image.',
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
			username: 'Test User 3',
			acct: 'testUser@patchwork',
			avatar: require('../../../assets/images/mock/user4.jpeg'),
		},
		content:
			'Images are not technically inserted into a web page; images are linked to web pages. The <img> tag creates a holding space for the referenced image.',
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
				username: 'Test User 2',
				acct: 'testUser@patchwork',
				avatar: require('../../../assets/images/mock/user2.jpeg'),
			},
			content: 'ABCDEFG',
			created_at: '23 hr ago',
			favourite_count: 2,
			reblogs_count: 7,
			replies_count: 1,
			statusType: 'feed',
		},
	},
];
