import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const baseURL = `${process.env.API_URL ?? 'https://patchwork.online'}/`;

const mockInstance = axios.create({
	baseURL,
});

export const mockServer = new MockAdapter(mockInstance, {
	delayResponse: 1000,
});

mockServer.onGet('/my-channel').reply(200, {
	data: [
		{
			id: '1',
			type: 'channel',
			attributes: {
				id: 10,
				name: 'Technology',
				slug: 'technology',
				description: '',
				is_recommended: true,
				admin_following_count: 0,
				account_id: 113122850080146544,
				patchwork_collection_id: 1,
				guides: {},
				participants_count: 0,
				visibility: 'public_access',
				community_type: {
					data: {
						id: '1',
						type: 'community_type',
						attributes: {
							id: 1,
							name: 'Broadcast',
						},
					},
				},
				banner_image_url:
					'https://s3-eu-west-2.amazonaws.com/patchwork-prod/communities/banner_images/000/000/015/original/Information-Technology.jpg?1731395858',
				avatar_image_url:
					'https://s3-eu-west-2.amazonaws.com/patchwork-prod/site_uploads/files/000/000/001/@2x/c7bd3f4c9f04816f.png',
				domain_name: 'technology.channel.org',
			},
		},
	],
});

export default mockInstance;
