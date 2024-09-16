import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const baseURL = `${process.env.API_URL ?? 'https://patchwork.online'}/`;

const mockInstance = axios.create({
	baseURL,
});

export const mockServer = new MockAdapter(mockInstance, {
	delayResponse: 1000,
});

mockServer.onGet('/my-channel').reply(200, [
	{
		id: 1,
		name: 'Science',
		is_private: false,
		slug: 'https://science.channel.org',
		image_updated_at: '2024-09-05T10:31:48.115+00:00',
		description: 'Science Channel.',
		image_url:
			'https://s3-eu-west-2.amazonaws.com/patchwork-prod/site_uploads/files/000/000/001/@2x/a1aba67d423ba44a.png',
		created_at: '2024-09-05T10:31:48.116+00:00',
		updated_at: '2024-09-05T10:31:48.116+00:00',
	},
	{
		id: 2,
		name: 'Technology',
		is_private: false,
		slug: 'https://technology.channel.org',
		image_updated_at: '2024-09-05T10:31:48.115+00:00',
		description: 'Technology Channel.',
		image_url:
			'https://s3-eu-west-2.amazonaws.com/patchwork-prod/site_uploads/files/000/000/001/@2x/c7bd3f4c9f04816f.png',
		created_at: '2024-09-05T10:31:48.116+00:00',
		updated_at: '2024-09-05T10:31:48.116+00:00',
	},
]);

export default mockInstance;
