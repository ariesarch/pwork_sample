export type NotificationData = {
	id: string;
	type: string;
	users: { id: string; image: string }[];
	message: string;
	time: string;
	post?: {
		author: string;
		domain: string;
		content: string;
	};
};

export const notifications: NotificationData[] = [
	{
		id: '1',
		type: 'boost',
		users: [
			{
				id: '1',
				image: require('../../../assets/images/mock/mockUser1.jpeg'),
			},
			{
				id: '2',
				image: require('../../../assets/images/mock/mockUser2.jpeg'),
			},
			{
				id: '3',
				image: require('../../../assets/images/mock/mockUser3.jpeg'),
			},
			{
				id: '4',
				image: require('../../../assets/images/mock/mockUser4.jpeg'),
			},
			{
				id: '5',
				image: require('../../../assets/images/mock/mockUser5.jpeg'),
			},
			{
				id: '6',
				image: require('../../../assets/images/mock/mockUser6.jpeg'),
			},
		],
		message: 'Account name and 5 others boosted your post',
		time: '3 sec ago',
		post: {
			author: 'Account name',
			domain: 'oxforduniversity.channel.org',
			content:
				'Consectetur quam cursus posuere at. Diam odic eu luctus viverra magna. Aliquet dui sagittis faucibus sit mi. Ultrices leo in bibendum sem.',
		},
	},
	{
		id: '2',
		type: 'favourite',
		users: [
			{
				id: '1',
				image: require('../../../assets/images/mock/mockUser1.jpeg'),
			},
			{
				id: '2',
				image: require('../../../assets/images/mock/mockUser2.jpeg'),
			},
			{
				id: '3',
				image: require('../../../assets/images/mock/mockUser3.jpeg'),
			},
			{
				id: '4',
				image: require('../../../assets/images/mock/mockUser4.jpeg'),
			},
			{
				id: '5',
				image: require('../../../assets/images/mock/mockUser5.jpeg'),
			},
			{
				id: '6',
				image: require('../../../assets/images/mock/mockUser6.jpeg'),
			},
		],
		message: 'Account name and 5 others favourited your post',
		time: '1 hr ago',
		post: {
			author: 'Account name',
			domain: 'oxforduniversity.channel.org',
			content:
				'Consectetur quam cursus posuere at. Diam odic eu luctus viverra magna. Aliquet dui sagittis faucibus sit mi. Ultrices leo in bibendum sem.',
		},
	},
	{
		id: '3',
		type: 'follow',
		users: [
			{
				id: '1',
				image: require('../../../assets/images/mock/mockUser1.jpeg'),
			},
			{
				id: '2',
				image: require('../../../assets/images/mock/mockUser2.jpeg'),
			},
			{
				id: '3',
				image: require('../../../assets/images/mock/mockUser3.jpeg'),
			},
			{
				id: '4',
				image: require('../../../assets/images/mock/mockUser4.jpeg'),
			},
		],
		message: 'Account name and 3 others followed you',
		time: '1 day ago',
	},
	{
		id: '4',
		type: 'follow',
		users: [
			{
				id: '1',
				image: require('../../../assets/images/mock/mockUser13.jpeg'),
			},
		],
		message: 'Account name followed you',
		time: '1 day ago',
	},
	{
		id: '5',
		type: 'follow',
		users: [
			{
				id: '1',
				image: require('../../../assets/images/mock/mockUser16.jpeg'),
			},
		],
		message: 'Account name followed you',
		time: '1 day ago',
	},
];
